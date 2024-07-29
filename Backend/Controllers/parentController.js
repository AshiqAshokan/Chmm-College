const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const Parent = require('../Models/parentModel');
const Student = require('../Models/studentModel');
const Attendance = require('../Models/AttendanceModel')
const Mark=require('../Models/MarksModel')
const mongoose = require('mongoose');

// Parent Authentication
const authParent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const parent = await Parent.findOne({ email });

  if (parent && (await parent.matchPassword(password))) {
    const token = generateToken(res, parent._id, parent.userType);

    res.json({
      _id: parent._id,
      name: parent.name,
      email: parent.email,
      studentId:parent.studentId,
      userType: parent.userType,
      course:parent.course,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Parent Registration
const registerParent = asyncHandler(async (req, res) => {
  const { name, phone, email, studentId, address, course, gender, password } = req.body;

  const parentExists = await Parent.findOne({ email });
  if (parentExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    res.status(400);
    throw new Error('Invalid studentId');
  }
  const existingStudent = await Student.findById(studentId);
  if (!existingStudent) {
    res.status(400);
    throw new Error('Student does not exist');
  }


  const parent = await Parent.create({
    name,
    phone,
    email,
    studentId, // Make sure to include studentId here
    address,
    course,
    gender,
    password,
    userType: 'Parent'
  });

  generateToken(res, parent._id, 'parent');

  res.status(201).json({
    _id: parent._id,
    name: parent.name,
    email: parent.email,
  });
});

// Parent Logout
const logoutParent = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get Parent Profile
const getParentProfile = asyncHandler(async (req, res) => {

  console.log('User Type:', req.userType); // Log the user type
    console.log('User ID:', req.userId);

  if (req.userType === 'Parent') {
    const parentId = req.userId;
    const parent = await Parent.findById(parentId);
    if (parent) {
      res.json(parent);
    } else {
      res.status(404).json({ error: 'Parent not found' });
    }
  } else {
    res.status(403).json({ error: 'Access forbidden' });
  }
});

// Update Parent Profile
const updateParentProfile = asyncHandler(async (req, res) => {
  const parent = await Parent.findById(req.userId);

  if (parent) {
    parent.name = req.body.name || parent.name;
    parent.email = req.body.email || parent.email;
    parent.phone = req.body.phone || parent.phone;
    parent.address = req.body.address || parent.address;
    parent.course = req.body.course || parent.course;
    parent.gender = req.body.gender || parent.gender;
    parent.studentId = req.body.studentId || parent.studentId;



    if (req.body.password) {
      parent.password = req.body.password;
    }

    const updatedParent = await parent.save();

    res.json({
      _id: updatedParent._id,
      name: updatedParent.name,
      email: updatedParent.email,
    });
  } else {
    res.status(404);
    throw new Error('Parent not found');
  }
});

const getStudentDetails = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const student = await Student.findById(studentId);
  if (student) {
    res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
      }
      
})

const getStudentAttendance = asyncHandler(async (req, res) => {
  const userId = req.params.attendanceId;

  try {
    const attendance = await Attendance.find({ userId: userId });

    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

const getStudentMarks = asyncHandler(async (req, res) => {
  const studentId = req.params.markId;
  console.log(studentId)
  const marks = await Mark.find({ studentId: studentId });

   
  if (marks) {
    res.json(marks);
  } else {
    res.status(404).json({ error: 'Marks not found' });
  }
});

const getParentList = async (req, res) => {
  console.log('Received request for course:', req.params.course); // Log the received course
  const { course } = req.params;

  try {
    const parents = await  Parent.find({ course });

    if (!parents || parents.length === 0) {
      return res.status(404).json({ message: 'No parents found' });
    }

    res.json(parents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  authParent,
  registerParent,
  logoutParent,
  getParentProfile,
  updateParentProfile,
  getStudentDetails,
  getStudentAttendance,
  getStudentMarks,
  getParentList,
};
