const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const Teacher = require('../Models/teacherModel');
const Student=require('../Models/studentModel')




const authTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const teacher = await Teacher.findOne({ email });
  
    if (teacher && (await teacher.matchPassword(password))) {
      if (teacher.userType === 'Teacher') { // Check userType
       const token = generateToken(res, teacher._id, teacher.userType);
  
        res.json({
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          userType: teacher.userType,
          course:teacher.course,
          subject:teacher.subject,
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
const registerTeacher = asyncHandler(async (req, res) => {
    const { name, phone, email, address, course, gender, password, subject } = req.body;

  const teacherExists = await Teacher.findOne({ email })
  if (teacherExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const teacher = await Teacher.create({
    name,
    phone,
    email,
    address,
    course,
    gender,
    password,
    subject,
    userType: 'Teacher'
  });
  
  const token= generateToken(res, teacher._id, 'Teacher');

  res.status(201).json({
    _id: teacher._id,
    name: teacher.name,
    email: teacher.email,
    token,
  });
});


const logoutTeacher = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get Student Profile
const getTeacherProfile = (req, res) => {
    // Handle student profile retrieval based on user type
    console.log('User Type:', req.userType); // Log the user type
    console.log('User ID:', req.userId);
    
    if (req.userType === 'Teacher') {
        // Access student-specific data or perform student-specific actions
        const teacherId = req.userId; // Assuming userId is extracted from JWT payload
        // Retrieve student profile based on studentId
        Teacher.findById(teacherId)
            .then((teacher) => {
                if (teacher) {
                    // Return student profile data
                    res.json(teacher);
                } else {
                    res.status(404).json({ error: 'teacher not found' });
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
const updateTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userId);

  if (teacher) {
    teacher.name = req.body.name || teacher.name;
    teacher.email = req.body.email || teacher.email;
    teacher.phone = req.body.phone || teacher.phone;
    teacher.address = req.body.address || teacher.address;
    teacher.gender = req.body.gender || teacher.gender;
    teacher.course = req.body.course || teacher.course;
    teacher.subject = req.body.subject || teacher.subject;

    if (req.body.password) {
        teacher.password = req.body.password;
    }

    const updatedTeacher = await teacher.save();

    res.json({
      _id: updatedTeacher._id,
      name: updatedTeacher.name,
      email: updatedTeacher.email,
    });
  } else {
    res.status(404);
    throw new Error('teacher not found');
  }
});

const getStudentList=asyncHandler(async (req, res) => {
  try {

    console.log("vbnvnkskk")
    const { course } = req.params;
    console.log("Course is:",course)
    // Assuming you have a model named Student and it has a 'course' field
    const students = await Student.find({ course });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getTeacherList = async (req, res) => {
  console.log('Received request for course:', req.params.course); // Log the received course
  const { course } = req.params;

  try {
    const teachers = await Teacher.find({ course });

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: 'No Teacher found' });
    }

    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = {
  authTeacher,
  registerTeacher,
  logoutTeacher,
  getTeacherProfile,
  updateTeacherProfile,
  getStudentList,
  getTeacherList,
  
};
