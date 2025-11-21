const express = require('express');
const router = express.Router();
const adminUserController = require('../../controller/admin/aUsers.controller.js');

router.get('/',adminUserController.getAllUsers);
router.get('/:id',adminUserController.getSingleUser);
router.get('/:id/block',adminUserController.blockUser);

module.exports = router