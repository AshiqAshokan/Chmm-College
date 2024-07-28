const jwt = require('jsonwebtoken');

const generateToken = (res, userId, userType) => {
  const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  console.log('Generated token:', token);

  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'None',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
    domain: 'chmm-college.onrender.com', // Set the domain attribute
  };
  res.cookie('jwt', token, cookieOptions);
  
  console.log('Cookie set:', res.getHeader('Set-Cookie'));
};

module.exports = generateToken;