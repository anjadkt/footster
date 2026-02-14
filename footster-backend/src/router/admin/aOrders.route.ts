import express from 'express'
import orderController from '../../controller/admin/aOrder.controller'
const router = express.Router();

router.get('/all',orderController.getAllOrders);
router.post('/status',orderController.changeStatus);

export default router