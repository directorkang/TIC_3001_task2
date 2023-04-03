// Import contact model
const Contact = require('./contactModel');

// Handle index actions
exports.index = async (req, res) => {
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
};

// Handle create contact actions
exports.new = async (req, res) => {
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
};

// Handle view contact info
exports.view = async (req, res) => {
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
};

// Handle update contact info
exports.update = async (req, res) => {
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
};

// Handle delete contact
exports.delete = async (req, res) => {
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
};