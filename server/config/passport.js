const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./env');
const User = require('../models/user.model');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.TOKEN_SECRET
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, next) => {
    User.findOne(payload._id)
        .exec()
        .then(user => {
            if (!user) {
                return next(null, false, {
                    error: 'User not found'
                });
            }

            return next(null, user);
        })
        .catch(err => {
            return next(err, false);
        });
});

passport.use(jwtAuth);