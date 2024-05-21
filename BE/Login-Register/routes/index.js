var express = require('express');
var router = express.Router();
var { profile } = require('../controller/profileController');
var { isLogin } = require('../library/verify');


router.get('/profile', isLogin, profile);


module.exports = router;

