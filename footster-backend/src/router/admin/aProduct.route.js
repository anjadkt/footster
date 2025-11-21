const express = require('express');
const router = express.Router();
const productController = require('../../controller/products.controller.js')
const adminProductController = require('../../controller/admin/aProduct.controller.js');

router.get('/all',productController.getAllProducts);
router.post('/add',adminProductController.addProduct);

module.exports = router