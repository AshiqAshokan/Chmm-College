// generateToken.js
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

const generateToken = (req, res, userId, userType) => {
  try {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    console.log('Generated token:', token);

    const cookies = new Cookies(req, res);
    cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    console.error(error);
    // Handle the error, e.g., return an error response to the client
  }
};

module.exports = generateToken;