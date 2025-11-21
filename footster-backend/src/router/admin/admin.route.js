const express = require('express');
const router = express.Router();
const adminController = require('../../controller/admin/admin.controller.js');

router.post('/register',adminController.adminRegister);

router.post('/login',adminController.adminLogin);
router.get('/login',adminController.adminLogin);

router.get('/logout',adminController.adminLogout);

module.exports = router ;