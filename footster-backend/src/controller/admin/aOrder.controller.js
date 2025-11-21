const Order = require('../../model/orders.model.js');

module.exports = {
  getAllOrders : async (req,res)=>{
    try{
      const orders = await Order.find().populate('items');
      res.status(200).json({
        message : "all order fetch success",
        status  : 200,
        orders
      });
    }catch(error){
      res.status(500).json({message : error.message , status :500});
    }
  },
  changeStatus : async (req,res)=>{
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
      res.status(500).json({message : error.message , status :500});
    }
  }
}