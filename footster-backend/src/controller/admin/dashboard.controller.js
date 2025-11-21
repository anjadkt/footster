const Order = require('../../model/orders.model.js');
const User = require('../../model/users.model.js');
const Product = require('../../model/products.model.js');

module.exports = {
  calcDashboard : async (req,res)=>{
    try{
      const totalUsers = await User.countDocuments();
      const totalOrders = await Order.countDocuments();
      const totalProducts = await Product.countDocuments();
      const orders = await await Order.find()
      const totalRevenue = orders.reduce((acc,ord)=>{
        return acc + ord.paymentDetails.total
      },0);
      
      console.log(totalRevenue);

      res.status(200).json({
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue
      });
    }catch(error){
      res.status(500).json({message : error.message , status : 500});
    }
  }
}