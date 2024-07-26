const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../Models/userModel');
const Student = require('../Models/studentModel')
const Teacher = require('../Models/teacherModel')
const Attendance = require('../Models/AttendanceModel')
// User Authentication
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      if (user.userType === 'User') {
        generateToken(res, user._id, user.userType);
  
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
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

// User Registration
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    userType: 'User'
  });
  
  generateToken(res, user._id, 'User');

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// User Logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getStudents = asyncHandler(async (req, res) => {
  console.log("Hello Students?")
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getTeachers = asyncHandler(async (req, res) => {
  console.log("Hello Teachers?")
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAttendance=asyncHandler(async (req, res) => {
  console.log("Hello Teachers? Attendance")
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getStudents,
  getTeachers,
  getAttendance,
};
