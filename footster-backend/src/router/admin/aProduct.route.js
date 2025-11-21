const express = require('express');
const router = express.Router();
const productController = require('../../controller/products.controller.js')
const adminProductController = require('../../controller/admin/aProduct.controller.js');

router.get('/all',productController.getAllProducts);
router.post('/add',adminProductController.addProduct);
router.delete('/remove',adminProductController.removeProduct);
router.put('/update',adminProductController.updateProduct);

module.exports = router