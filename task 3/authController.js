const jwt = require('jsonwebtoken');
const User = require('./userModel');

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

exports.authenticateUser = function (req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided.' });
    }

    jwt.verify(token, 'your-secret-key', function (err, decoded) {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token.' });
        }

        req.user = decoded;
        next();
    });
};

exports.authorizeUser = function (req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'You are not authorized to perform this action.' });
    }

    next();
};