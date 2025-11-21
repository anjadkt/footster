const User = require('../model/users.model.js');

module.exports = async (req,res,next)=>{
  try {
    const {id} = req.user
    const user = await User.findOne({_id : id});
    if(user.status === "Blocked")return res.status(403).json({message : "User is Blocked!",status : 403});
    next();
  } catch (error) {
    res.status(500).json({message : error.message,status : 500})
  }

}