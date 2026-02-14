import express from 'express'
import dashBoardController from '../../controller/admin/dashboard.controller'

const router = express.Router();

router.get('/',dashBoardController.calcDashboard);

export default router