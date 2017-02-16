const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

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
	profile: {
	    firstName: { type: String },
	    lastName: { type: String }
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role',
		required: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String,
		default: ''
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
	let user = this;
	user.revokeToken( err => {
		if (err) {
			return cb(err);
		}

		user.token = jwt.sign(user, 'secret', {
			expiresInSeconds: 100000
		});

		return user.save( err => {
			return cb(err, user);
		});
	});
};

UserSchema.methods.revokeToken = cb => {
	let user = this;
	user.token = '';

	return user.save( err => {
		return cb(err);
	});
};

module.exports = mongoose.model('User', UserSchema);
