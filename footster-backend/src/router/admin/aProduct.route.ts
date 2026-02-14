import express from 'express'
import productController from '../../controller/products.controller'
import adminProductController from '../../controller/admin/aProduct.controller'
const router = express.Router();

router.get('/all',productController.getAllProducts);
router.post('/add',adminProductController.addProduct);
router.put('/remove',adminProductController.removeProduct);
router.put('/update',adminProductController.updateProduct);
router.get('/:id',productController.getOneProduct);

export default router