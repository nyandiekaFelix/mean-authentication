module.exports = {
    setUserInfo:  (account) => {
        let getUserInfo = {
            _id: account._id,
            email: account.email,
            firstName: account.profile.firstName,
            lastName: account.profile.lastName,
            avatar: account.avatar,
            role: account.role
        };

        return getUserInfo;
    }
};