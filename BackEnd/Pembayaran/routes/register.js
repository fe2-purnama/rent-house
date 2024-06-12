const router = require('express').Router();
const { formRegister, saveRegister }  = require('../controller/registerController');
const verifyUser = require('../library/verify');

router.get('/', verifyUser.isLogout, formRegister);
router.post('/save', verifyUser.isLogout, saveRegister);

module.exports = router;