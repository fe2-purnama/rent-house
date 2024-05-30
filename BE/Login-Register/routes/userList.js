var express = require('express');
var router = express.Router();
var { userList, getUserById, updateUser, deleteUser } = require('../controller/userListController');

router.get('/', userList);
router.get('/update/:id', getUserById);
router.post('/update/:id', updateUser);
router.get('/delete/:id', deleteUser); // Add this line

module.exports = router;
