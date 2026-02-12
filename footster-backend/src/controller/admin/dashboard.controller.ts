import Order from '../../model/orders.model'
import User from '../../model/users.model'
import Product from '../../model/products.model'
import { Request,Response } from 'express'
import errorFunction from '../../types/errorFunction'

export default {
  calcDashboard : async (req:Request,res:Response)=>{
    try{
      const totalUsers = await User.countDocuments({role : "user"});
      const totalOrders = await Order.countDocuments();
      const totalProducts = await Product.countDocuments();
      const orders = await Order.find();
      const totalRevenue = orders.reduce((acc,ord)=>{
        return acc + ord.paymentDetails.total
      },0);

      
      res.status(200).json({
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue
      });
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  }
}