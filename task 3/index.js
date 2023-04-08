//index.js
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api-routes');
const config = require('./config');

// Create Express app
const app = express();

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("MongoDB connected successfully");
});

// Set up routes
app.use('/api', apiRoutes);

// Start server
const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});