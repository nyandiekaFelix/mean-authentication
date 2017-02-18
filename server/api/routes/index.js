const router = require('express').Router();
const userRoutes = require('./user.routes.js');

router.use('/user', userRoutes);

router.get('/', (req, res) => {
 	res.status(200).json({ message: 'Api Connected!' });
});


module.exports = router;