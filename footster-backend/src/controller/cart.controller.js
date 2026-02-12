const User = require('../model/users.model.js');
const Product = require('../model/products.model.js');
module.exports = {
  addToCart : async (req,res)=>{
    try{

      const user = await User.findOne({_id : req.user.id});
      const {id : productId , quantity } = req.body;
      const exist = user.cart.find( p => p.product.toString() === productId);

      if(exist){
        exist.quantity += Number(quantity) || 1 ;
      }else{
        user.cart.push({
          product : productId,
          quantity
        });
      }

      await user.save();

      const {cart} = await User.findOne({_id : req.user.id}).populate('cart.product')
      
      res.json({
        cart,
        message : "Item added succesfully!",
        status : 200
      })
    }catch(error){
      res.status(500).json({
        message : error.message,
        status :500
      })
    }
  },

  getCart : async (req,res)=>{
    try {
      const {cart,name} = await User.findOne({_id : req.user.id}).populate("cart.product");
      
      res.json({
        cart,
        name,
        message : "cart fetch success!",
        status : 200
      })
    } catch (error) {
      res.status(500).json({message : error.message , status : 500})
    }
  },

  removeItem : async (req,res)=>{
    try {
      const {id} = req.body ;
      const details = await User.updateOne({_id : req.user.id},{$pull : {cart : {product : id}}});

      if(!details.modifiedCount)return res.status(404).json({message : "Product Not Found!",status :404});

      const user = await User.findOne({_id : req.user.id}).populate("cart.product");

      res.status(200).json({
        message : "Product Removed !",
        status : 200,
        cart : user.cart
      });

    } catch (error) {
      res.status(500).json({message : error.message , status : 500})
    }
  },

  incOrDec : async (req,res)=>{
    try { 
      const {id} = req.body
      const action = req.params.action ;
      let product ;
      if(action === "inc"){
       product = await User.findOneAndUpdate({_id : req.user.id , "cart.product": id},{$inc : {
        "cart.$.quantity" : 1
       } });
      }
      if(action === "dec"){
       product = await User
       .findOneAndUpdate({_id : req.user.id , "cart.product": id , "cart.quantity" : {$gt : 1}},{$inc :{
        "cart.$.quantity" : -1
       } });
      }

      if(!product){
        res.status(404).json({
          message : "Product not found!",
          status : 404
        })
        return ;
      }

      const {cart} = await User.findOne({_id : req.user.id }).populate("cart.product");

      res.status(200).json({
        message : "quanitity updated!",
        cart,
        status : 200
      })
    } catch (error) {
      res.status(500).json({
        message : error.message,
        status : 500
      })
    }
  }
}