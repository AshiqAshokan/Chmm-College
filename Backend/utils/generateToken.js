// generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (res, userId, userType) => {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Generated token:', token);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true, // Ensure this is true for sameSite: 'none'
      sameSite: 'none', // Correct value for cross-site cookies
      domain: 'chmm-college.onrender.com', // Correct domain for your app
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

module.exports = generateToken;
