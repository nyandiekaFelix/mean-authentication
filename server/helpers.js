module.exports = {
    setUserInfo:  (account) => {
        let getUserInfo = {
            _id: account._id,
            email: account.email,
            profile: account.profile,
            role: account.role
        };

        return getUserInfo;
    }
};