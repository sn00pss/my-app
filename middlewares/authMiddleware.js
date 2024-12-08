const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config/jwtConfig');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
