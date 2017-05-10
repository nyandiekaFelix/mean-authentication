const gravatar = require('gravatar');

const User = require('../models/user/user.model');

module.exports = {
    // Query database for a user's details
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