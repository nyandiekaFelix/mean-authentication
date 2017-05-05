const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const token = require('../../config/token');

router.get('/', (req, res) => {
	res.status(200).json({ message: 'User route works' });
});

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);

router.route('/profile/:userId')
	  .get(userCtrl.getOneUser)
	  .put(userCtrl.updateUser);


module.exports = router;