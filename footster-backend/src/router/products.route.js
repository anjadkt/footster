const express = require('express');
const router = express.Router();
const Products = require('../model/products.model.js')

router.get('/',async (req,res)=>{
  const {_page , _limit} = req.query ;
  
  const limit = Number(_limit);
  const page = ( ( Number(_page) -1 ) * limit );
  
  try{
    const products = await Products.aggregate([
      {$skip : page},
      {$limit : limit }
    ]);
    res.json(products);
  }catch(error){
    console.log(error.message);
  }
  
});


module.exports = router ;