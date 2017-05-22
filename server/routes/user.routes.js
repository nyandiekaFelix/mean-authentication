const router = require('express').Router();
const passport = require('passport');

const userCtrl = require('../controllers/user.controller');
const passportService = require('../config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', userCtrl.getAllUsers);

router.route('/profile')
	  .get(requireAuth, userCtrl.getOneUser)
	  .put(requireAuth, userCtrl.updateUser);

module.exports = router;