const Orders = require('../model/orders.model.js');
const User = require('../model/users.model.js');
const Product = require('../model/products.model.js');

module.exports = {
  addUserOrders : async (req,res)=>{
    try {
      const {id} = req.user ;
      const {paymentDetails,items,address} = req.body ;
      const newItems = []

      for(let id of items){
        const product = await Product.findOne({_id : id});
        if(!product) throw new Error(`Product not found: ${id}`);
        newItems.push(product);
      }

      const order = Orders({
        userId : id,
        date : new Date(),
        status : "Placed",
        paymentDetails,
        items : newItems,
        to : address
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
  }
}