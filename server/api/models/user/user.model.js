const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const secret = require('../../../config/main.js').secret;
 

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	},
	/*profile: {
	    firstName: { type: String },
	    lastName: { type: String }
	},*/
	password: {
		type: String,
		required: true
	}
});

/* ---- Password Hashing ---- */
UserSchema.pre('save', function (next) {
	let user = this;
	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

/* ---- Password Verification ---- */
UserSchema.methods.comparePassword = (candidatePassword, cb) => {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

UserSchema.methods.generateToken = cb => {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		exp: parseInt(expiry.getTime() / 1000)
	}, secret);
};


module.exports = mongoose.model('User', UserSchema);
