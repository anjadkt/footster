import express from 'express'
import productController from '../controller/products.controller'
const router = express.Router();

router.get('/',productController.getAllProducts);
router.get('/:id',productController.getOneProduct);

export default router
