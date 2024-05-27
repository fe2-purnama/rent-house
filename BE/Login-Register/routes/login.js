const router = require('express').Router();
const { login, logout, loginAuth, verifyToken } = require('../controller/loginController');
const { isLogout } = require('../library/verify');

router.get('/', isLogout, login);
router.get('/logout', logout);
router.post('/auth', loginAuth);
router.get('/images/png.png', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/images/png.png'));
});
module.exports = router;