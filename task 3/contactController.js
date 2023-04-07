//contactController.js
// Import contact model
const Contact = require('./contactModel');
const authController = require('./authController');

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await authController.authenticate(token);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed',
            data: null
        });
    }
};

// Handle index actions
exports.index = [
    authenticateUser,
    async (req, res) => {
        try {
            const contacts = await Contact.find({}).limit(10);
            res.json({
                status: 'success',
                message: 'Contacts retrieved successfully',
                data: contacts
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
                data: null
            });
        }
    }
];

// Handle create contact actions
exports.new = [
    authenticateUser,
    async (req, res) => {
        try {
            const contact = new Contact({
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone
            });
            const savedContact = await contact.save();
            res.json({
                message: 'New contact created!',
                data: savedContact
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
                data: null
            });
        }
    }
];

// Handle view contact info
exports.view = [
    authenticateUser,
    async (req, res) => {
        try {
            const contact = await Contact.findById(req.params.contact_id);
            res.json({
                message: 'Contact details loading..',
                data: contact
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
                data: null
            });
        }
    }
];

// Handle update contact info
exports.update = [
    authenticateUser,
    async (req, res) => {
        try {
            const contact = await Contact.findById(req.params.contact_id);
            contact.name = req.body.name;
            contact.gender = req.body.gender;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            const savedContact = await contact.save();
            res.json({
                message: 'Contact Info updated',
                data: savedContact
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
                data: null
            });
        }
    }
];

// Handle delete contact
exports.delete = [
    authenticateUser,
    async (req, res) => {
        try {
            const deletedContact = await Contact.deleteOne({ _id: req.params.contact_id });
            res.json({
                status: 'success',
                message: 'Contact deleted',
                data: deletedContact
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
                data: null
            });
        }
    }
];