//api-routes.js
// Initialize express router
let router = require('express').Router();
const authController = require('./authController');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub!',
    });
});

// Import contact controller
const contactController = require('./contactController');

// Import authentication middleware
const { authenticateUser } = require('./authController');

// Contact routes
router.route('/contacts')
    .get(authenticateUser, contactController.index)
    .post(authenticateUser, contactController.new);

router.route('/contacts/:contact_id')
    .get(authenticateUser, contactController.view)
    .patch(authenticateUser, contactController.update)
    .put(authenticateUser, contactController.update)
    .delete(authenticateUser, contactController.delete);

// Define the login route
router.post('/login', authController.login);

// Define the signup route
router.post('/signup', authController.signup);

// Export API routes
module.exports = router;
