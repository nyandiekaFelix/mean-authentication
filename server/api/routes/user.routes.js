const router = require('express').Router();
const jwt = require('express-jwt');
const auth = jwt({
	secret: 'SuperSecret',
	userProperty: 'payload'
});

const profileCtrl = require('../controllers/profile.controller.js');
const authCtrl = require('../controllers/auth.controller.js');


router.get('/', (req, res, next) => {
	res.status(200).json({ message: 'User!' });
});

// profile
router.get('/profile', auth, profileCtrl.viewProfile);

// authentication
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;