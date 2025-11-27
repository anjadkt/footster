const express = require('express');
const router = express.Router();
const wishContoller = require('../controller/wishlist.controller.js');

router.get('/',wishContoller.showList);
router.post('/',wishContoller.addOrDltFav);
router.get('/favorite',wishContoller.getFavProducts);
module.exports = router