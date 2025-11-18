const express = require('express');
const router = express.Router();
const cartRouter = require('../controller/cart.controller.js');

router.get('/',cartRouter.getCart);
router.post('/',cartRouter.addToCart);
router.delete('/',cartRouter.removeItem);

module.exports = router