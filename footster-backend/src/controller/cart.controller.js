const User = require('../model/users.model.js');
module.exports = {
  addToCart : async (req,res)=>{
    try{

      const user = await User.findOne({_id : req.user.id});
      const {id : productId , quantity } = req.body;
      const exist = user.cart.find( p => p.product.toString() === productId);

      if(exist){
        exist.quantity += quantity;
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
      const {cart} = await User.findOne({_id : req.user.id}).populate("cart.product");
      
      res.json({
        cart,
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

      const user = await User.findOne({_id : req.user.id});
      const updatedCart = user.cart.filter(p => p.product.toString() !== id);
      
      user.cart = updatedCart ;
      await user.save();

      res.status(200).json({
        message : "Product Removed !",
        status : 200,
        cart : updatedCart 
      });

    } catch (error) {
      res.status(500).json({message : error.message , status : 500})
    }
  }
}