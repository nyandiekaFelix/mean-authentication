const express = require('express');
const passport = require('passport');

const User = require('../models/user/user.model.js');


const router = express.Router();

router.post('/signup', (req, res) => {
	let user = new User({
		username: req.body.username
	});

	User.register(user, req.body.password, (err, account) => {
		if (err) {
			return res.status(500).json({ err: err });
		}

		passport.authenticate('local')(req, res, () => {
			return res.status(200).json({
				status: 'User registration succeeded'
			});
		});
	});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}

		if(!user) {
			return res.status(401).json({ err: info });
		}

		req.logIn(user, err => {
			if (err) {
				return res.status(500).json({
					err: 'could not log in user'
				});
			}

			res.status(200).json({
				status: 'login succesful'
			});
		});
	})(req, res, next);
});

router.get('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({
		status: 'User logged out'
	});
});

router.get('/status', (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(200).json({ status: false });
	}

	res.status(200).json({ status: true});
});


module.exports = router;