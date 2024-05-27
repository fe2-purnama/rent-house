var express = require('express');
var router = express.Router();
var { userList } = require('../controller/userListController');
var { isLogin } = require('../library/verify');

router.get('/', isLogin, userList);  // Correct the route path to '/'

module.exports = router;
