const express = require('express');
const userRoute = require('../controller/users.controller.js')
const router = express.Router();

router.post('/register',userRoute.userRegister);

router.post('/login',userRoute.userLogin);
router.get('/login',userRoute.userLogin);

router.get('/logout',userRoute.userLogout);

module.exports = router ;