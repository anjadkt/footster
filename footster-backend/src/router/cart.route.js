const express = require('express');
const router = express.Router();
const cartRouter = require('../controller/cart.controller.js');

router.get('/',cartRouter.getCart);
router.post('/',cartRouter.addToCart);
router.put('/',cartRouter.removeItem);
router.post('/:action',cartRouter.incOrDec);

module.exports = router