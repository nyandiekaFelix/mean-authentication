const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String },
	email:{
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	avatar:{
		type:String,
		default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
	},
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

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

/* ---- Password Verification ---- */
UserSchema.methods.comparePassword = function(password, next) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		next(err, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
