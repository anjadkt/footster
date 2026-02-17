import Orders from '../model/orders.model'
import User from '../model/users.model'
import { Request,Response } from 'express';
import errorFunction from '../types/errorFunction';

export default {
  addUserOrders : async (req:Request,res:Response)=>{
    try {
      const id = req.user?.id ;
      const {paymentDetails,items,to} = req.body ;

      const order = await Orders.create({
        userId : id,
        date : new Date().toLocaleString(),
        status : "Placed",
        paymentDetails,
        items,
        to
      });

      await User.findOneAndUpdate({_id : id},{$push : {"orders" : order._id},cart:[]});
      
      res.status(200).json({
        message : "Order successfull!",
        status :200,
        orderId : order._id
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },
  getAOrder : async (req:Request,res:Response)=>{
    try{
      const {id} = req.params
      const order = await Orders.findOne({_id : id}) ;
      if(!order) return res.status(404).json({message : "Order Not Found!",status : 404});
      res.status(200).json({
        order,
        status : 200,
        message : "Order Found!"
      })
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  },

  getUserOrders : async(req:Request,res:Response)=>{
    try {
      const id = req.user?.id
      const user  = await User.findOne({_id : id}).populate("orders");
      if(!user)return res.status(404).json({message : "User Not Found!",status : 404});
      res.status(200).json({
        message : "Orders fetch success!",
        orders : user.orders,
        status : 200
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  }
}