import Order from '../../model/orders.model'
import { Request,Response } from 'express';
import errorFunction from '../../types/errorFunction';

export default {
  getAllOrders : async (req:Request,res:Response)=>{
    try{
      const orders = await Order.find().populate('items');
      res.status(200).json({
        message : "all order fetch success",
        status  : 200,
        orders
      });
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  },
  changeStatus : async (req:Request,res:Response)=>{
    try{
      const {orderId , status} = req.body
      const order = await Order.updateOne({_id : orderId},{status});
      if(!order)return res.status(404).json({message : "Order not found!",status : 404});
      res.status(200).json({
        message : "status updated!",
        order,
        status : 200
      })
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  }
}