// Initialize express router
let router = require('express').Router();
const authController = require('./authController');
const axios = require('axios');

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
    .get(authenticateUser, function(req, res) {
        const endpoint = 'http://localhost:8080/api/contacts';
        const token = req.headers.authorization.split(' ')[1]; // extract the token from the authorization header
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.get(endpoint, { headers })
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                console.error(error.response.data);
                res.status(500).json({ error: error.message });
            });
    })
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
