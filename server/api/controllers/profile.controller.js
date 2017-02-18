const User = require('../models/user/user.model.js');

module.exports.viewProfile = (req, res) => {
	if (!req.payload._id) {
		res.status(401).json({
			name: 'UnauthorizedError',
			message: 'Unauthorized to view this resource'
		})
	}

	User.findById(req.payload._id).exec((err, user) => {
		res.status(200).json(user);
	});
};