const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

/**
 * Generates a JWT token and sets it as a cookie
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} userId - User ID to be stored in the token
 * @param {string} userType - User type to be stored in the token
 */
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

  // Use cookies.get() to retrieve the cookie value
  console.log('Cookie set:', cookies.get('jwt', { signed: true }));
};

module.exports = generateToken;