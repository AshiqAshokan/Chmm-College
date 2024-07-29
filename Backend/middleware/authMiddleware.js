// authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const Student = require('../Models/studentModel');
const Teacher = require('../Models/teacherModel');
const Parent = require('../Models/parentModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
        throw new Error('User not found');
      }

      req.user = user;
      req.userType = userType; // Include user type in the request object
      req.userId = decoded.userId; // Include user ID in the request object
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
