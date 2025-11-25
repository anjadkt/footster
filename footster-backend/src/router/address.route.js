const express = require('express');
const router = express.Router();
const addressRouter = require('../controller/adress.controller.js')

router.post('/',addressRouter.addAddress);
router.get('/',addressRouter.getAddress);

module.exports = router