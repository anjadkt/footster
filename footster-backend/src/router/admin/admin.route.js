const express = require('express');
const router = express.Router();
const adminController = require('../../controller/admin/admin.controller.js');
const userController = require('../../controller/users.controller.js');
const verifyToken = require('../../middleware/verifyToken.js');

router.post('/register',adminController.adminRegister);

// router.post('/login',adminController.adminLogin);
// router.get('/login',adminController.adminLogin);

router.get('/logout',verifyToken,userController.userLogout);

module.exports = router ;