import express from 'express'
const router = express.Router();
import orderController from '../controller/orders.controller';

router.post('/',orderController.addUserOrders);
router.get('/all',orderController.getUserOrders);
router.get('/:id',orderController.getAOrder);
export default router ;