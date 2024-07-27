// authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const Student = require('../Models/studentModel');
const Teacher = require('../Models/teacherModel');
const Parent = require('../Models/parentModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);
      let user;
      let userType;

      if (decoded.userType === 'User') {
        user = await User.findById(decoded.userId).select('-password');
        userType = 'User';
      } else if (decoded.userType === 'student') {
        user = await Student.findById(decoded.userId).select('-password');
        userType = 'student';
      } else if (decoded.userType === 'Teacher') {
        user = await Teacher.findById(decoded.userId).select('-password');
        userType = 'Teacher';
      } else if (decoded.userType === 'Parent') {
        user = await Parent.findById(decoded.userId).select('-password');
        userType = 'Parent';
      }

      if (!user) {
        console.log('User not found');
        throw new Error('User not found');
      }

      req.user = user;
      req.userType = userType; // Include user type in the request object
      req.userId = decoded.userId; // Include user ID in the request object
      next();
    } catch (error) {
      console.error('Token Error:',error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    console.log('No token provided');
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
