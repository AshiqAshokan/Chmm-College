// generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (res, userId, userType) => {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      SameSite: 'none', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path:'/'
    };
  
    console.log('Cookie:', {
      jwt: token,
      options: cookieOptions
    });
  
    res.cookie('jwt', token, cookieOptions);
};

module.exports = generateToken;
