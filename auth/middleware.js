const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.secret_key); // Ensure the correct key name
        req.user = {userID:decoded.userID };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    auth
};