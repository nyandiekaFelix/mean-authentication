const router = require('express').Router();
const userRoutes = require('./user.routes.js');

router.get('/', (req, res) => {
 	res.status(200).json({ message: 'Api Connected!' });
});

router.use('/account', userRoutes);

module.exports = router;

