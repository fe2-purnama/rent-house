var express = require('express');
var router = express.Router();
var { profile, editProfile, updateProfile, changePassword, updatePassword } = require('../controller/profileController');
var { isLogin } = require('../library/verify');
//menambah variabel buyerRoutes- Dian

router.get("/profile", isLogin, profile);
router.get("/profile/edit", isLogin, editProfile);
router.post("/profile/update", isLogin, updateProfile);
router.get("/profile/change-password", isLogin, changePassword);
router.post("/profile/change-password", isLogin, updatePassword);
// Gunakan rute untuk pembeli (/buyer)- dian

module.exports = router;
