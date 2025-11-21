const express = require('express');
const router = express.Router();
const dashBoardController = require('../../controller/admin/dashboard.controller.js');

router.get('/',dashBoardController.calcDashboard);

module.exports = router