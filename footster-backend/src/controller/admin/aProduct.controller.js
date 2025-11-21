const Product = require('../../model/products.model.js');

module.exports = {
  addProduct : async (req,res)=>{
    try {
      const { img , category ,name , price } = req.body ;
      if(!img || !category || !name || !price)return res.status(400).json({message : "incomplete form!",status:400});

      const product = await Product.create({
        isFav : false ,
        reviews :[],
        img,
        category,
        rating : 2.0,
        name,
        price
      });
      res.status(200).json({
        message : "product added successfully!",
        status : 200,
        product
      })
    } catch (error) {
      res.status(500).json({message : error.message , status : 500 });
    }
  }
}