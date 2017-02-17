const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
	secret: 'SuperSecret',
	userProperty: 'payload'
});

const profileCtrl = require('../controllers/profile.controller.js');
const authCtrl = require('../controllers/auth.controller.js');

// profile
router.get('/profile', auth, profileCtrl.viewProfile);

// authentication
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;