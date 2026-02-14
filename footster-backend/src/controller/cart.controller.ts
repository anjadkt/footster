import User from '../model/users.model'
import { Request,Response } from 'express';
import errorFunction from '../types/errorFunction';

export default {
  addToCart : async (req:Request,res:Response)=>{
    try{

      const user = await User.findOne({_id : req.user.id});
      if(!user)return res.status(404).json({message:"user not found!",status :404});
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

      const userDoc = await User.findOne({ _id: req.user.id }).populate("cart.product");

      if (!userDoc) {
        return res.status(404).json({
          message: "User not found",
          status: 404
        });
      }
      res.json({
        cart : userDoc.cart,
        message : "Item added succesfully!",
        status : 200
      })
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  },

  getCart : async (req:Request,res:Response)=>{
    try {
      const user = await User.findOne({_id : req.user.id}).populate("cart.product");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: 404
        });
      }
      res.json({
        cart:user.cart,
        name:user.name,
        message : "cart fetch success!",
        status : 200
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },

  removeItem : async (req:Request,res:Response)=>{
    try {
      const {id} = req.body ;
      const details = await User.updateOne({_id : req.user.id},{$pull : {cart : {product : id}}});

      if(!details.modifiedCount)return res.status(404).json({message : "Product Not Found!",status :404});

      const user = await User.findOne({_id : req.user.id}).populate("cart.product");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: 404
        });
      }
      res.status(200).json({
        message : "Product Removed !",
        status : 200,
        cart : user.cart
      });

    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },

  incOrDec : async (req:Request,res:Response)=>{
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

      const user = await User.findOne({_id : req.user.id }).populate("cart.product");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: 404
        });
      }
      res.status(200).json({
        message : "quanitity updated!",
        cart:user.cart,
        status : 200
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  }
}