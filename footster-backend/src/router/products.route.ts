import express from 'express'
const router = express.Router();
import productController from '../controller/products.controller'

router.get('/',productController.getAllProducts);

router.get('/:id',productController.getOneProduct);

export default router ;