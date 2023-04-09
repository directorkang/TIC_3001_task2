//redisCache.js
const redis = require('redis');
const client = redis.createClient();

exports.index = async (req, res) => {
    try {
        const cacheKey = 'contacts';
        // Check if data exists in cache
        client.get(cacheKey, async (err, data) => {
            if (err) throw err;
            if (data !== null) {
                // If data exists in cache, return cached data
                res.json({
                    status: 'success',
                    message: 'Contacts retrieved from cache',
                    data: JSON.parse(data)
                });
            } else {
                // If data does not exist in cache, retrieve data from database
                const contacts = await Contact.find({}).limit(10);
                // Store data in cache
                client.setex(cacheKey, 3600, JSON.stringify(contacts));
                res.json({
                    status: 'success',
                    message: 'Contacts retrieved successfully',
                    data: contacts
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};