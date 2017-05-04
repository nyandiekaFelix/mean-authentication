const router = require('express').Router();
const userCtrl = require('../controllers/user.controller.js');
const token = require('../../config/token.js');

router.get('/', (req, res) => {
	res.status(200).json({ message: 'User route pinged' });
});

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);

router.get('/profile', token.ensureAuthenticated, userCtrl.getLoggedInUserDetails);
router.put('/profile', token.ensureAuthenticated, userCtrl.updateLoggedInUserDetails);



module.exports = router;