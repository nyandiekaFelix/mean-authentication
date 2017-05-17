const router = require('express').Router();
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

// All user endpoints to be preceded by '/user'
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;