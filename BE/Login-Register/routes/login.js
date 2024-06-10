const router = require('express').Router();
const { login, loginAuth } = require('../controller/loginController');
const { isLogout } = require('../library/verify');

router.get('/', isLogout, login);
// router.get('/logout', logout);
router.post('/auth', loginAuth);

module.exports = router;