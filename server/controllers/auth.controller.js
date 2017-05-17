const jwt =  require('jsonwebtoken');
const gravatar = require('gravatar');

const config = require('../config/env');
const User = require('../models/user.model');

const helpers = require('../helpers');

function generateJWT(user) {
    return jwt.sign(user, config.TOKEN_SECRET, {
        expiresIn: 10080 // a week in seconds
    });
}

module.exports = {
     registerUser: (req, res) => {
        User.findOne({ email: req.body.email })
            .exec()
            .then(existingUser => {
                if (existingUser) {
                    return res.status(400).json({
                        message: 'Sorry, that email is already registered to another account'
                    });
                }
                
                const avatarUrl = gravatar.url(req.body.email, { s: '200', r: 'x', d: 'retro' }, true);

                const user = new User({
                    profile: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    },
                    email: req.body.email,
                    password: req.body.password,
                    avatar: avatarUrl
                });

                
                user.save((err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    
                    const detailsToReturn = helpers.setUserInfo(user);
                    res.status(201).send({
                        id_token: `JWT ${generateJWT(detailsToReturn)}`,
                        user: detailsToReturn
                    });
                });
            })
            .catch(err => res.status(500).json(err));
    },

    loginUser: (req, res) => {
        User.findOne({ email: req.body.email })
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: 'Wrong email address'
                    });
                }

                user.comparePassword(req.body.password, (err, ismatch) => {
                    if (err) {
                        return res.status(401).send(err);
                    }

                    if (!ismatch) {
                        return res.status(401).json({
                            message: 'Wrong password'
                        });
                    }

                    const detailsToReturn = helpers.setUserInfo(user);
                    res.status(201).send({
                        id_token: `JWT ${generateJWT(detailsToReturn)}`,
                        user: detailsToReturn
                    });
                });
            })
            .catch(err => res.status(500).json(err));
    }
}
