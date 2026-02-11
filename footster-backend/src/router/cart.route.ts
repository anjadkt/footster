import express from 'express'
import cartRouter from '../controller/cart.controller'
const router = express.Router();

router.get('/',cartRouter.getCart);
router.post('/',cartRouter.addToCart);
router.put('/',cartRouter.removeItem);
router.post('/inc',cartRouter.incOrDec);
router.post('/dec',cartRouter.incOrDec);

export default router