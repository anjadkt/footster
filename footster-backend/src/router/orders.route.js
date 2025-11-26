const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders.controller.js');

router.post('/',orderController.addUserOrders);
router.get('/all',orderController.getUserOrders);
router.get('/:id',orderController.getAOrder);
module.exports = router ;