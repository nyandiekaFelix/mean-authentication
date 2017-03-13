const gravatar = require('gravatar');
const User = require('../models/user/user.model.js');
const secrets = require('../../config/secrets.js');
const token = require('../../config/token.js');

module.exports = {
	// Just a ping message to show api is working
	welcome: (req, res) => {
		return res.status(200).json({
			message: 'Welcome to the MEAN app auth API'
		});
	},

	// create a new user and store details in db
	registerUser: (req, res) => {
		User.findOne({ email: req.body.email }, '+password', (err, existingUser) => {
			if (existingUser) {
				return res.status(400).json({
					message: 'Email entered is already in use by another account'
				});
			}

			const avatarUrl = gravatar.url(req.body.email, { s: '200', r: 'x', d: 'retro' }, true);
			const user = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				avatar: avatarUrl
			});

			user.save((err, result) => {
				if(err){
					res.status(500).json({
						message: err.message
					});
				}
				res.send({ token: token.generateJWT(result) });
			});
		});
	},

	// Authenticate user using email and password before returning a token
	loginUser: (req, res) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (!user) {
				return res.status(401).json({
					message: 'Invalid email address'
				});
			}

			user.comparePassword(req.body.password, (err, isMatch) => {
				if (!isMatch) {
					return res.status(401).json({
						message: 'Invalid Password'
					});
				}

				res.send({ token: token.generateJWT(user) });
			});
		});
	},

	// Query database for current logged in user details
	getLoggedInUserDetails: (req, res) => {
		user.findById(req.user, (err, user) => {
			if (err) {
				res.send({ 
					message : 'Getting user details was unsuccessful'
				});
			}
			res.send(user);
		});
	},

	// Update logged in user's details
	updateLoggedInUserDetails: (req, res) => {
		User.findById(req.user, (err, user) => {
			if (!user) {
				return res.status(400).send({
					message: 'User not found'
				});
			}

			user.username = req.body.username || user.username;
			user.email = req.body.email || user.email;

			user.save((err) => {
				res.status(200).send({
					message: 'Profile updated successfully'
				});
			});
		});
	},
}