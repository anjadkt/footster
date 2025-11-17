const express = require('express');
const registerRoute = require('../controller/users.controll.js')
const router = express.Router();

router.post('/',registerRoute.userRegister);

module.exports = router ;