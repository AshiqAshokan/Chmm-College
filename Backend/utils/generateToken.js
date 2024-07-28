// generateToken.js
const jwt = require('jsonwebtoken');
const { path } = require('../app');

const generateToken = (res, userId, userType) => {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Generated token:', token);
  
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      SameSite: 'none', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
    });
    console.log('Cookie set:', req.cookies.jwt);

};

module.exports = generateToken;
