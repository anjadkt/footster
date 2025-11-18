const express = require('express');
const router = express.Router();
const wishContoller = require('../controller/wishlist.controller.js');

router.get('/',wishContoller.showList);
router.post('/',wishContoller.addFav);
router.delete('/',wishContoller.removeFav);

module.exports = router