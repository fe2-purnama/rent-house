var express = require('express');
var router = express.Router();
var { userList } = require('../controller/userListController');
// var { verifyToken } = require('../controller/loginController');


router.get('/', userList);  // Correct the route path to '/'

module.exports = router;
