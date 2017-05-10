const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Auth route works' });
});

router.post('/register', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);

module.exports = router;