const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const secrets = require('./secrets.js');

module.exports = (passport) => {
    let options = {};
    options.jwtFromRequest = 
}