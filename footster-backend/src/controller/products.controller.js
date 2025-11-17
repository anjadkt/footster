const Products = require('../model/products.model.js');
module.exports = {
  getProducts : async (req,res)=>{
    if(req.query){
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
    }else{
      const products = await Products.find();
      res.json(products);
    }
     
  }
}