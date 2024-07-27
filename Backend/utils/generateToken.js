// generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (res, userId, userType) => {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Generated token:', token);
  
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'chmm-college.onrender.com',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

module.exports = generateToken;
