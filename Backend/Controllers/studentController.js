const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const Student = require('../Models/studentModel');
const Note =require('../Models/notesModel')
const Video=require('../Models/teacherVideo')
const Mark = require('../Models/MarksModel');
const Teacher = require('../Models/teacherModel')
const {Fee} = require('../Models/FeesModel')

const Question=require('../Models/questionModel')

// Student Authentication
const authStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const student = await Student.findOne({ email });
  
    if (student && (await student.matchPassword(password))) {
      if (student.userType === 'student') { // Check userType
        generateToken(res, student._id, student.userType);
  
        res.json({
          _id: student._id,
          name: student.name,
          email: student.email,
          userType: student.userType,
          course:student.course,
          token,
          

        });
      } else {
        res.status(401);
        throw new Error('Invalid user type');
      }
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  

// Student Registration
const registerStudent = asyncHandler(async (req, res) => {
  const { name, fatherName, motherName, phone, email, address, course, gender, password } = req.body;

  const studentExists = await Student.findOne({ email })
  if (studentExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const student = await Student.create({
    name,
    fatherName,
    motherName,
    phone,
    email,
    address,
    course,
    gender,
    password,
    userType: 'student'
  });
  
  generateToken(res, student._id, 'student');

  res.status(201).json({
    _id: student._id,
    name: student.name,
    email: student.email,
  });
});

// Student Logout
const logoutStudent = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get Student Profile
const getStudentProfile = (req, res) => {
  console.log('User Type:', req.userType); // Log the user type
  console.log('User ID:', req.userId);
    // Handle student profile retrieval based on user type
    if (req.userType === 'student') {
        // Access student-specific data or perform student-specific actions
        const studentId = req.userId; // Assuming userId is extracted from JWT payload
        // Retrieve student profile based on studentId
        Student.findById(studentId)
            .then((student) => {
                if (student) {
                    // Return student profile data
                    res.json(student);
                } else {
                    res.status(404).json({ error: 'Student not found' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        res.status(403).json({ error: 'Access forbidden' });
    }
};

// Update Student Profile
const updateStudentProfile = asyncHandler(async (req, res) => {
  console.log("Reached in update profile")
  const studentId = req.userId;
  console.log("student:",studentId)
  const student = await Student.findById(studentId); // Access student ID from req.userId

  if (student) {
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.course = req.body.course || student.course;
    student.address = req.body.address || student.address;
    student.fatherName = req.body.fatherName || student.fatherName;
    student.motherName = req.body.motherName || student.motherName;
    student.phone = req.body.phone || student.phone;
    student.gender = req.body.gender || student.gender;

    if (req.body.password) {
      student.password = req.body.password;
    }

    const updatedStudent = await student.save();

    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      email: updatedStudent.email,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

const getNotes= asyncHandler(async (req, res) => {

  try {
    console.log("hum tum")
    const { course } = req.query;
    console.log("course is:",course)
    if (!course) {
      return res.status(400).json({ message: 'Course query parameter is required' });
    }
    const notes = await Note.find({ course });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

})

const getStudentVideos = asyncHandler(async (req, res) => {
  console.log("studentvideos")
  const course = req.query.course;
  console.log("course is:",course)

  if (!course) {
    res.status(400);
    throw new Error('Course is required');
  }

  const videos = await Video.find({ course });

  if (videos) {
    res.json({ videos });
  } else {
    res.status(404);
    throw new Error('No videos found');
  }
});

const getQuestion= asyncHandler(async (req, res) => {

  try {
    console.log("student questions")
    const { course } = req.query;
    console.log("course is:",course)
    if (!course) {
      return res.status(400).json({ message: 'Course query parameter is required' });
    }
    const questions = await Question.find({ course });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

})

const getStudentMarks= async (req, res) => {
  console.log("Student Marks")

  const { studentId } = req.query;

  try {
    const marks = await Mark.find({ studentId });
    res.json(marks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

const getTeacherList=asyncHandler(async (req, res) => {
  try {

    console.log("Hello Teachers")
    const { course } = req.params;
    console.log("Course is:",course)
    // Assuming you have a model named Student and it has a 'course' field
    const teachers = await Teacher.find({ course });
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getStudentDetails = async (req, res) => {
  try {
    console.log("Student Details")
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({
      name: student.name,
      course: student.course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentRetrival = async (req, res) => {
  console.log("Reached")
  const { studentId } = req.params;
  console.log("student is ",studentId)
  try {
      const student = await Fee.find({studentId:studentId}); // Adjust as necessary for your data model
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: error.message });
  }
};


module.exports = {
  authStudent,
  registerStudent,
  logoutStudent,
  getStudentProfile,
  updateStudentProfile,
  getNotes,
  getStudentVideos,
  getQuestion,
  getStudentMarks,
  getTeacherList,
  getStudentDetails,
  getStudentRetrival
};
