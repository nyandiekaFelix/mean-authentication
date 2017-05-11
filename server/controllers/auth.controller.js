const jwt =  require('jsonwebtoken');

const config = require('../config/env');
const User = require('../models/user.model');

function generateJWT(user) {
    return jwt.sign(user, config.TOKEN_SECRET, {
        expiresIn: 600000 // in seconds
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
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: avatarUrl
                });

                user.save((err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    
                    user.password = undefined;
                    res.status(201).send({
                        id_token: token.generateJWT(user),
                        user: user
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

                    user.password = undefined;
                    res.status(200).json({
                        id_token: token.generateJWT(user),
                        user: user
                    });
                });
            })
            .catch(err => res.status(500).json(err));
    }
}
