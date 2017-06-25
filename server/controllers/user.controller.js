const User = require('../models/user.model');
const helpers = require('../helpers');

module.exports = {
    getAllUsers: (req, res) => {
        User.find({})
            .exec()
            .then(users => {
                if (!users) {
                    return res.status(404).json({
                        err: 'No users found'
                    });
                }
                const usersToReturn = [];

                users.forEach((user) => {
                    const userDetails = helpers.setUserInfo(user);
                    usersToReturn.push(userDetails);
                });

                return res.status(200).json({
                    users: usersToReturn
                });
            })
            .catch(err => res.status(500).json({
                err: err 
            }));
    },

    getOneUser: (req, res) => {
        User.findById(req.user)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ 
                        err: 'User not found'
                    });
                }
                
                const detailsToReturn = helpers.setUserInfo(user);
                return res.status(200).json({
                    user: detailsToReturn
                });
            })
            .catch(err => res.status(500).json({
                err: err
            }));
    },

    updateUser: (req, res) => {
        User.findById(req.params.userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        err: 'User not found'
                    });
                }

                const updatedUser = {
                    profile: {
                        firstName: req.body.firstName || 
                        user.profile.firstName,
                        lastName: req.body.lastName || 
                        user.profile.lastName
                    },
                    email: req.body.email || user.email
                };

                return Object.assign(user, updatedUser);
            })
            .then(user => {
                return user.save();
            })
            .then(updatedDoc => {
                const detailsToReturn = helpers.setUserInfo(updatedDoc);
                res.status(200).json({
                    user: detailsToReturn
                });
            })
            .catch(err => res.status(500).json({
                err: err 
            }));
    }
}