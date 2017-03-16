const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

module.exports = {

    generateJWT: (user) => {
        return jwt.sign(user, secrets.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24
        })
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
        const timestamp = Math.round(new Date() / 1000);

        try {
            payload = jwt.verify(token, secrets.TOKEN_SECRET);
        } catch (err) {
            return res.status(401).send({
                message: err.message
            });
        }

        if (payload.expiresIn <= timestamp) {
            return res.status(401).json({
                message: 'Token has expired'
            });
        }

        req.user = payload.sub;
        next();
    }
}