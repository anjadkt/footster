const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders.controller.js');

router.post('/',orderController.addUserOrders);

module.exports = router ;