//authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('./config');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed',
            error: error.message
        });
    }
};

module.exports = authMiddleware;