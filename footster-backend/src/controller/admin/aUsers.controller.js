const User = require('../../model/users.model.js');
const {Types} = require('mongoose')

module.exports = {
  getAllUsers : async (req,res)=>{
    try {
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
      res.status(500).json({message : error.message , status : 500})
    }
  }
}