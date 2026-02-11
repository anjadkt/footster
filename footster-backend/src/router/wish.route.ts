import express from 'express'
const router = express.Router();
import wishContoller from '../controller/wishlist.controller.js'

router.get('/',wishContoller.showList);
router.post('/',wishContoller.addOrDltFav);
router.get('/favorite',wishContoller.getFavProducts);
export default router