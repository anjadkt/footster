import express from 'express'
import wishContoller from '../controller/wishlist.controller'
const router = express.Router();

router.get('/',wishContoller.showList);
router.post('/',wishContoller.addOrDltFav);
router.get('/favorite',wishContoller.getFavProducts);

export default router