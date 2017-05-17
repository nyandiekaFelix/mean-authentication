const gravatar = require('gravatar');

const User = require('../models/user.model');

module.exports = {
    getAllUsers: (req, res) => {
        User.find({})
            .exec()
            .then(users => {
                if (!users) {
                    return res.status(404).json({
                        message: 'No users found'
                    });
                }
                return res.status(200).json(users);
            })
            .catch(err => res.status(500).json(err));
    },

    getOneUser: (req, res) => {
        User.findById(req.params.userId, '-password')
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ 
                        message: 'User not found'
                    });
                }
                return res.status(200).json(user);
            })
            .catch(err => res.status(500).json(err));
    },

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