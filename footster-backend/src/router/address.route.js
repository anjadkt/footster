const express = require('express');
const router = express.Router();
const addressRouter = require('../controller/adress.controller.js')

router.post('/',addressRouter.addAddress);

module.exports = router