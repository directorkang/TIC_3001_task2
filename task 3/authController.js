//authController.js
const jwt = require('jsonwebtoken');
const User = require('./contactModel');

exports.login = async function (req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed. User not found.' });
        }

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
                return res.status(401).json({ error: 'Authentication failed. Wrong password.' });
            }

            if (isMatch) {
                const token = jwt.sign({ username: user.username, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

                return res.json({ success: true, token: token });
            }

            return res.status(401).json({ error: 'Authentication failed. Wrong password.' });
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.signup = async function (req, res) {
    try {
        const user = await User.create(req.body);

        const token = jwt.sign({ username: user.username, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

        return res.json({ success: true, token: token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await authController.authenticate(token);
        req.user = user;

        // Check if the authenticated user has the necessary permissions
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied',
                data: null
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed',
            data: null
        });
    }
};

exports.authorizeUser = function (req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'You are not authorized to perform this action.' });
    }

    next();
};
