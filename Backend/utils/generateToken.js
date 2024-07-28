const jwt = require('jsonwebtoken');

const generateToken = (req, userId, userType) => {
    const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    console.log('Generated token:', token);

    req.session.jwt = token; // Set the token in the session cookie

    console.log('Session cookie set:', req.session.jwt);
};

module.exports = generateToken;
