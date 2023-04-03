// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://127.0.0.1:27017/resthub', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("MongoDB connected successfully");
});

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.json({ message: 'Rest API is working' }));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
const server = app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

// export the server so it can be used in your tests
module.exports = server;
