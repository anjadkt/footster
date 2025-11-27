const Products = require('../model/products.model.js');
const User = require('../model/users.model.js');
module.exports = {
  getAllProducts : async (req,res)=>{
    if(req.query.category){
      try{
        const {category} = req.query ;
        const products = await Products.find({category});
        return res.status(200).json(products);
      }catch(error){
        res.status(500).json({message : error.message , status : 500 });
      }
    }
    if(Object.keys(req.query).length > 0){
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
  },
  getOneProduct : async (req,res)=>{
    try{
      const id = req.params.id ;
      const product = await Products.find({_id : id});
      if(product.length>0)return res.status(200).json(product)
      else return res.status(404).json({message : "Product not found!",status : 404});
    }catch(error){
      res.status(500).json({message : error.message , status : 500});
    }
  }
}