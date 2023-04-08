const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./contactModel');

exports.login = function (req, res) {
    // Find the user in the database
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) throw err;

        // If the user doesn't exist, return an error response
        if (!user) {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if the password is correct
            user.checkPassword(req.body.password, function (err, isMatch) {
                if (err) throw err;

                if (!isMatch) {
                    res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    // If the password is correct, create a token with the user ID and username
                    const token = jwt.sign({ id: user._id, username: user.username }, config.secret, {
                        expiresIn: '24h'
                    });

                    // Return the token in the response body
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            });
        }
    });
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

exports.authenticate = async function (token) {
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findById(decoded.id);
    return user;
};

exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await exports.authenticate(token);
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
