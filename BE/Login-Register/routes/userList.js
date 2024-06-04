var express = require('express');
var router = express.Router();
var { userList, getUserById, updateUser, deleteUser } = require('../controller/userListController');
// const { verifyToken } = require('../controller/loginController'); // Import the verifyToken middleware

// Protect the routes with verifyToken middleware
router.get('/', /*verifyToken,*/ userList);
router.get('/update/:id',/*verifyToken,*/ getUserById);
router.post('/update/:id', /*verifyToken,*/ updateUser);
router.get('/delete/:id', /*verifyToken,*/ deleteUser);

module.exports = router;
