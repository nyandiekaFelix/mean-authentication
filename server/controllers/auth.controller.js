const jwt =  require('jsonwebtoken');

const config = require('../config/env');
const User = require('../models/user.model');

function generateToken(user) {
    return jwt.sign(user, config.TOKEN_SECRET, {
        expiresIn: 600000 // in seconds
    });
}

module.exports = {
    register: (req, res) => {},
    login: (req, res) => {}
}
