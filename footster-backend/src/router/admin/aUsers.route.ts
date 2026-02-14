import express from 'express'
import adminUserController from '../../controller/admin/aUsers.controller'
const router = express.Router();

router.get('/',adminUserController.getUserDetails);
router.get('/all',adminUserController.getAllUsers)
router.get('/:id',adminUserController.getSingleUser);
router.put('/updateStatus',adminUserController.changeOrderStatus);
router.get('/:id/block',adminUserController.blockUser);

export default router