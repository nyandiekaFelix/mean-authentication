const User = require('../models/user.model');

module.exports = {
    getAllUsers: (req, res) => {
        const _userProjections = '_id email profile avatar role';
        User.find({}, _userProjections)
            .exec()
            .then(users => {
                if (!users) {
                    return res.status(404).json({
                        err: 'No users found'
                    });
                }

                return res.status(200).json({
                    users: users
                });
            })
            .catch(err => res.status(500).json({
                err: err 
            }));
    },

    getOneUser: (req, res) => {
        const _userProjections = '_id email profile avatar role';
        User.findById(req.params.userId, _userProjections)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ 
                        err: 'User not found'
                    });
                }
                
                return res.status(200).json({
                    user: user
                });
            })
            .catch(err => res.status(500).json({
                err: err
            }));
    },

    updateUser: (req, res) => {
        const _userProjections = '_id email profile avatar role';
        User.findById(req.params.userId, _userProjections)
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
                res.status(200).json({
                    user:updatedDoc
                });
            })
            .catch(err => res.status(500).json({
                err: err 
            }));
    }
}