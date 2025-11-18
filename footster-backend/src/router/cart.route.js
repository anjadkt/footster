const express = require('express');
const router = express.Router();
const cartRoter = require('../controller/cart.controller.js');

router.get('/',cartRoter.getCart);
router.post('/add',cartRoter.addToCart);


module.exports = router