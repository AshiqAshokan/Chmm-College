// generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (res, userId, userType) => {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Generated token:', token);
  
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Use 'None' for cross-site requests
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    
    console.log('Cookie set:', res.getHeader('Set-Cookie'));
};

module.exports = generateToken;
