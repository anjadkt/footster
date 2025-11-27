const express = require('express');
const userRoute = require('../controller/users.controller.js');
const allUserRoute = require('../controller/admin/aUsers.controller.js');
const verifyToken = require('../middleware/verifyToken.js');
const { verify } = require('jsonwebtoken');

const router = express.Router();

router.post('/register',userRoute.userRegister);

router.post('/login',userRoute.userLogin);
router.get('/login',userRoute.userLogin);

router.get('/all',allUserRoute.getAllUsers);

router.get('/details',verifyToken,allUserRoute.getUserDetails);

router.get('/logout',verifyToken,userRoute.userLogout);

module.exports = router ;