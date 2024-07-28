// generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (res, userId, userType) => {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Generated token:', token);
  
    const isProduction = process.env.NODE_ENV === 'production';
    const sameSite = isProduction ? 'None' : 'Lax';
    const secure = sameSite === 'None' ? true : isProduction;

    res.cookie('jwt', token, {
      httpOnly: true,
      secure,
      sameSite,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    
    console.log('Cookie set:', res.getHeader('Set-Cookie'));
};

module.exports = generateToken;