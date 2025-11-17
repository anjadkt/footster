const express = require('express');
const router = express.Router();
const cartRoter = require('../controller/cart.controller.js');

router.post('/add',cartRoter.addToCart);

module.exports = router