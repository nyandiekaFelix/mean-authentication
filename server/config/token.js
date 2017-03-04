const jwt = require('jwt-simple');
const secrets = require('./secrets.js');
const moment = require('moment');

module.exports = {

	generateJWT: (user) => {
		const payload = {
			sub: user._id,
			iat: moment().unix(), // Get unix timestamp using moment.js
			exp: moment().add(14, 'days').unix()
		};

		return jwt.encode(payload, secrets.TOKEN_SECRET);
	},

	// Ensure user is authenticated in order to make protected api calls
	ensureAuthenticated: (req, res, next) => {
		if (!req.header('Authorization')) {
			return req.status(401).send({
				message: 'The request does not have an authorization header'
			});
		}

		const token = req.header('Authorization').split(' ')[1];
		let payload = null; 

		try {
			payload = jwt.decode(token, secrets.TOKEN_SECRET);
		}
		catch (err) {
			return res.status(401).send({
				message: err.message
			});
		}

		if (payload.exp <= moment().unix()) {
			return res.status(401).json({
				message: 'Token has expired'
			});
		}

		req.user = payload.sub;
		next();
	}
}