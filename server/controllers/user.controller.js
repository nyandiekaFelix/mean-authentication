const gravatar = require('gravatar');

const User = require('../models/user/user.model');
const secrets = require('../config/secrets');
const token = require('../config/passport');

module.exports = {

    // create a new user and store details in db
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

    // Authenticate user using email and password before returning a token
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
                    if (!ismatch) {
                        return res.status(401).json({
                            message: 'Wrong password'
                        });
                    }

                    user.password = undefined;
                    res.status(201).json({
                        id_token: token.generateJWT(user),
                        user: user
                    });
                });
            })
            .catch(err => res.status(500).json(err));
    },

    // Query database for current logged in user details
    getOneUser: (req, res) => {
        User.findById(req.params.userId, '-password')
            // .populate('books') 
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found'});
                }
                return res.status(200).json(user);
            })
            .catch(err => res.status(500).json(err));
    },

    // Update logged in user's details
    updateUser: (req, res) => {
         User.findOneAndUpdate(req.params.userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({message: 'User not found'});
                }
                return res.status(200).json(user);
            })
            .catch(err => res.status(500).json(err));
    }
}