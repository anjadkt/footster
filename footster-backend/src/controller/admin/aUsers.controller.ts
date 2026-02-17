import User from '../../model/users.model'
import Order from '../../model/orders.model'
import { Request,Response } from 'express';
import errorFunction from '../../types/errorFunction';
import {Types} from 'mongoose'

export default {
  getAllUsers : async (req:Request,res:Response)=>{
    try {
      
      const users = await User.aggregate([
        {$match : {role : "user"}},
        {
          $project :{
            password : 0,
            cart : 0,
            favorite :0
          }
        }]
      )
      res.status(200).json({
        users,
        message : "fetch all users success!",
        status :200
      });
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },

  getUserDetails : async (req:Request,res:Response)=>{
    try {
      const email = req.query.email || req.user?.email ;
      if(email){
        const user = await User.findOne({email}).populate("favorite").populate("cart.product");
        if(!user)return res.status(404).json({message : "User Not found",status : 404});
        res.status(200).json({
          name : user.name,
          status : user.status,
          cart : user.cart,
          favorite : user.favorite,
          role : user.role,
          address : user.address
        });
        return ;
      }

      const users = await User.aggregate([
        {
          $project :{
            password : 0,
            cart : 0,
            favorite :0
          }
        }
      ]);
      res.status(200).json({
        users,
        message : "fetch all users success!",
        status :200
      });
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },

  getSingleUser : async (req:Request,res:Response)=>{
    try{
      const id = req.params.id;
      if (typeof id !== "string") {
        throw new Error("Invalid id");
      }
      const objectId = new Types.ObjectId(id);
      const user = await User.aggregate([
        {
          $match : {
            _id : objectId
          }
        },
        {
          $lookup :{
            from : "orders",
            localField : "orders",
            foreignField : "_id",
            as : "orderDetails"
          }
        },
        {
          $project :{
            password : 0,
            cart : 0,
            favorite :0,
            orders :0
          }
        }
      ])
      if(!user)return res.status(404).json({message : "User Not Found!", status : 404});

      res.status(200).json({
        message: "User fetch success!",
        user,
        status: 200,
      });

    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  },

  blockUser : async (req:Request,res:Response)=>{
    try {
      const id = req.params.id ;
      const user = await User.findOne({_id : id});
      if(!user) return res.status(404).json({message : "User Not Found!",status :404});
      
      user.status = user.status === "Active" ? "Blocked" : "Active"
      await user.save();

      res.status(200).json({
        message : `User ${user.status}!`,
        status : 200
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },
  changeOrderStatus : async (req:Request,res:Response)=>{
    try{
      const {id,status} = req.body ;
      const order = await Order.findOneAndUpdate({_id : id},{status});
      if(!order)return res.status(404).json({message : "Order Not Found!",status :404});

      res.status(200).json({
        message : `Order modified to ${status} !`,
        order,
        status : 200
      });
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  }
}