const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const config = require('./env');
const User = require('../models/user.model');

module.exports = (passport) => {
    let options = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.TOKEN_SECRET
    };

    passport.use(new JwtStrategy(options, (jwt_payload, next) => {
        User.findOne({id: jwt_payload.sub})
            .exec()
            .then(user => {
                if (user) {
                    return next(null, user);
                } else {
                    return next(null, false);
                    //or create a new account
                }
            })
            .catch(err => {
                return next(err, false);
            });
    }));
   
}