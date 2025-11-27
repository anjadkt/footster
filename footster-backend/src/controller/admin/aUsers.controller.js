const User = require('../../model/users.model.js');
const Order = require('../../model/orders.model.js');
const {Types} = require('mongoose')

module.exports = {
  getAllUsers : async (req,res)=>{
    try {
      
      const users = await User.aggregate([
        {$match : {role : "user"}},
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
      res.status(500).json({message : error.message , status : 500});
    }
  },
  getUserDetails : async (req,res)=>{
    try {
      const email = req.query.email || req.user.email ;
      if(email){
        const user = await User.aggregate([
          {
            $match : {
              "email" : email
            }
          },
          {
            $project :{
              email : 1,
              status : 1,
              name : 1,
              login : 1,
              role : 1,
              cartCount : {$size : "$cart"}
            }
          }
        ]);

        res.status(200).json(user || []);
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
      conosle.log(users);
      res.status(200).json({
        users,
        message : "fetch all users success!",
        status :200
      });
    } catch (error) {
      res.status(500).json({message : error.message , status : 500});
    }
  },
  getSingleUser : async (req,res)=>{
    try{
      const {id} = req.params;
      const user = await User.aggregate([
        {
          $match : {
            _id : new Types.ObjectId(id)
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
        message : "user fetch success!",
        user,
        status : 200
      });
    }catch(error){
      res.status(500).json({message : error.message , status : 500});
    }
  },
  blockUser : async (req,res)=>{
    try {
      const {id} = req.params ;
      console.log(id)
      //const user = await User.updateOne({_id : id},{status : "Blocked"});
      const user = await User.findOne({_id : id});
      if(!user) return res.status(404).json({message : "User Not Found!",status :404});
      
      user.status = user.status === "Active" ? "Blocked" : "Active"
      await user.save();

      res.status(200).json({
        message : `User ${user.status}!`,
        status : 200
      })
    } catch (error) {
      res.status(500).json({message : error.message , status : 500});
    }
  },
  changeOrderStatus : async (req,res)=>{
    try{
      const {id,status} = req.body ;
      const order = await Order.findOneAndUpdate({_id : id},{status});
      if(!order || !order.modifiedCount)return res.status(404).json({message : "Order Not Found!",status :404});

      res.status(200).json({
        message : `Order modified to ${status} !`,
        order,
        status : 200
      });
    }catch(error){
      res.status(500).json({message : error.message , status : 500});
    }
  }
}