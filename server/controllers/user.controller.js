const User = require('../models/user.model');
const helpers = require('../helpers');

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
                const usersToReturn = [];

                users.forEach((user) => {
                    const userDetails = helpers.setUserInfo(user);
                    usersToReturn.push(userDetails);
                });

                return res.status(200).json({
                    users: usersToReturn
                });
            })
            .catch(err => res.status(500).json(err));
    },

    getOneUser: (req, res) => {
        User.findById(req.user)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ 
                        message: 'User not found'
                    });
                }
                
                const detailsToReturn = helpers.setUserInfo(user);
                return res.status(200).json({
                    user: detailsToReturn
                });
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

                const userToReturn = helpers.setUserInfo(user);
                return res.status(200).json({
                    user: userToReturn
                });
            })
            .catch(err => res.status(500).json(err));
    }
}