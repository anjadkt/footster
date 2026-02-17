import express from 'express'
import orderController from '../controller/orders.controller'
const router = express.Router();

router.post('/',orderController.addUserOrders);
router.get('/all',orderController.getUserOrders);
router.get('/:id',orderController.getAOrder);

export default router
