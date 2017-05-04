const router = require('express').Router();
const userRoutes = require('./user.routes.js');

// All user endpoints to be preceded by '/user'
router.use('/user', userRoutes);

module.exports = router;