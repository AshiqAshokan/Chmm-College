const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

const generateToken = (req, res, userId, userType) => {
  const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  console.log('Generated token:', token);

  const cookies = new Cookies(req, res);
  cookies.set('jwt', token, {
    httpOnly: true,
    secure: true, // Use secure cookies
    sameSite: 'none', // Set sameSite to 'none'
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
    domain: 'chmm-college.onrender.com', // Set the domain attribute if needed
  });

  console.log('Cookie set:', cookies.get('jwt'));
};

module.exports = generateToken;
