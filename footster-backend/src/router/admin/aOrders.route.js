const express = require('express');
const router = express.Router();
const orderController = require('../../controller/admin/aOrder.controller.js');

router.get('/all',orderController.getAllOrders);

module.exports = router