// contactModel.js
const mongoose = require('mongoose');

//update schema
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;