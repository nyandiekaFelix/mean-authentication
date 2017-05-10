const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');

router.get('/', (req, res) => {
	res.status(200).json({ message: 'User route works' });
});

router.route('/profile/:userId')
	  .get(userCtrl.getOneUser)
	  .put(userCtrl.updateUser);

module.exports = router;