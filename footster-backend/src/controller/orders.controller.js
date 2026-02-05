const Orders = require('../model/orders.model.js');
const User = require('../model/users.model.js');
const Product = require('../model/products.model.js');

module.exports = {
  addUserOrders : async (req,res)=>{
    try {
      const {id} = req.user ;
      const {paymentDetails,items,to} = req.body ;

      const order = Orders({
        userId : id,
        date : new Date().toLocaleString(),
        status : "Placed",
        paymentDetails,
        items,
        to
      });
      await order.save();

      await User.findOneAndUpdate({_id : id},{$push : {"orders" : order._id}});
      
      res.status(200).json({
        message : "Order successfull!",
        status :200,
        orderId : order._id
      })
    } catch (error) {
      res.status(500).json({message : error.message,status : 500});
    }
  },
  getAOrder : async (req,res)=>{
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
      res.status(500).json({message : error.message , status :500})
    }
  },
  getUserOrders : async(req,res)=>{
    try {
      const id = req.user.id
      const user  = await User.findOne({_id : id}).populate("orders");
      if(!user)return res.status(404).json({message : "User Not Found!",status : 404});
      res.status(200).json({
        message : "Orders fetch success!",
        orders : user.orders,
        status : 200
      })
    } catch (error) {
      res.status(500).json({message : error.message , status :500});
    }
  }
}