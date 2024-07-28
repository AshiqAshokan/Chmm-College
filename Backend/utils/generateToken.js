const jwt = require('jsonwebtoken');

const generateToken = (userId, userType) => {
  const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  return token;
};

module.exports = generateToken;
