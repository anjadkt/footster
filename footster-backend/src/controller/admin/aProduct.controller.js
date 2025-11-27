const Product = require('../../model/products.model.js');

module.exports = {
  addProduct : async (req,res)=>{
    try {
      const { img , category ,name , price } = req.body ;
      if(!img) img = ""
      if(!category || !name || !price)return res.status(400).json({message : "incomplete form!",status:400});

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
  },
  removeProduct : async (req,res)=>{
    try {
      const {id} = req.body ;
      const product = await Product.findOne({_id : id});
      if(!product)res.status(404).json({message : "Product not found!",status :404});

      const deletedProduct = await Product.deleteOne({_id : id});

      res.status(200).json({
        message : "Product removed!",
        status : 200,
        deletedProduct
      })

    } catch (error) {
      res.status(500).json({message : error.message , status : 500});
    }
  },
  updateProduct : async (req,res)=>{
    try {
      const {id , img , category , price , name } = req.body ;
      if(!id || !img || !category || !price ||!name)return res.status(400).json({message : "incomplete form!",status:400});

      const updatedProduct = await Product.updateOne({_id : id} , {
        name,
        category,
        price,
        img
      });

      res.status(200).json({
        message : "Product Updated!",
        updatedProduct,
        status : 200
      })
    } catch (error) {
      res.status(500).json({message : error.message , status : 500});
    }
  },
  getOneProduct : async (req,res)=>{
    try {
       const {id} = req.params ;
       const product = await Product.findOne({_id : id});
       if(!product)res.status(404).json({message : "Product not found!",status :404});

       res.status(200).json(product)
    } catch (error) {
      res.status(500).json({message : error.message , status : 500});
    }
  }
}