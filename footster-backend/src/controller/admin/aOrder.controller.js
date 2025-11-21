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
  }
}