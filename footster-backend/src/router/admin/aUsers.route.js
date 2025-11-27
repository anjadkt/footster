const express = require('express');
const router = express.Router();
const adminUserController = require('../../controller/admin/aUsers.controller.js');

router.get('/',adminUserController.getUserDetails);
router.get('/all',adminUserController.getAllUsers)
router.get('/:id',adminUserController.getSingleUser);
router.put('/updateStatus',adminUserController.changeOrderStatus);
router.get('/:id/block',adminUserController.blockUser);

module.exports = router