const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../api/models/user/user.model.js');
const config = require('./main.js');

module.exports = (passport) => {
	passport.use( 'local', new LocalStrategy(
		(username, password, done) => {
			user.findOne({ username: username}, (err, user) =>{
				if (err) {
					return done(err);
				}
				if(!user) {
					return done(null, false, {
						message: 'User Not Found'
					});
				}
				if (!user.validPassword(password)) {
					return done(null, false, {
						message: 'Wrong Password'
					});
				}

				return done(null, user)
			});
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};