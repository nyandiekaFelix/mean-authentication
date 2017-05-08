const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const config = require('./env');
const User = require('../models/user.model');

const localOptions = {
    usernameield: 'email'
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.TOKEN_SECRET
};

const localLogin = new LocalStrategy(localOptions, (email, password, next) => {
    User.findOne({ email })
        .exec()
        .then(user => {
            if (!user) {
                return next(null, false, {
                    error: 'User not found'
                });
            }

            user.comparePassword(password, (err, isMatch) => {
                if (err) { return next(err); }

                if (!ismatch) {
                    return res.status(401).json({
                        message: 'Wrong password'
                    });
                }

                return next(null, user);
            });
        })
        .catch(err => {
            return next(err, false);
        });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, next) => {
    User.findOne(payload._id)
        .exec()
        .then(user => {
            if (!user) {
                return next(null, false, {
                    error: 'User not found'
                });
            }

            return next(null, user);
            //or create a new account
        })
        .catch(err => {
            return next(err, false);
        });
});

passport.use(localLogin);
passport.use(jwtLogin);