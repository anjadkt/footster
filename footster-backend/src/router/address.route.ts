import express from 'express'
import addressRouter from '../controller/adress.controller'
const router = express.Router();

router.post('/',addressRouter.addAddress);
router.get('/',addressRouter.getAddress);

export default router