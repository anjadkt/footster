const express = require('express');
const userRoute = require('../controller/users.controller.js');
const allUserRoute = require('../controller/admin/aUsers.controller.js');
const verifyToken = require('../middleware/verifyToken.js');
const limitter = require('../middleware/rateLimitter.js');

const router = express.Router();

router.post('/register',limitter,userRoute.userRegister);

router.post('/login',limitter,userRoute.userLogin);
router.get('/login',limitter,userRoute.userLogin);

router.get('/all',allUserRoute.getAllUsers);

router.get('/details',verifyToken,allUserRoute.getUserDetails);

router.get('/logout',verifyToken,userRoute.userLogout);

module.exports = router ;