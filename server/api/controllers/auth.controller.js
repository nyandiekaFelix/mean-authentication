const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const User = require('../models/user/user.model.js');

module.exports.signup = (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email
	});

	user.save((err) => {
		let token = user.generateToken();
		res.status(200).json({ token: token });
	});
};

module.exports.login = (req, res) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(404).json(err);
		}

		if (user) {
			let token = user.generateToken();
			res.status(200).json({ token: token });
		}

		res.status(401).json(info);
	})(req, res);
};