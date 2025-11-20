require('dotenv').config();
const {SECRET_KEY} = process.env ;
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
  try{
    const token = req.cookies.token ;
    if(token){
      jwt.verify(token,SECRET_KEY,(err,data)=>{
        if(err)return res.status(401).json({message : "token invalid!",status : 401});
        req.user = data ;
        if(data)return next();
      })
    }else{
      return res.status(401).json({message : "token expired!",status : 401});
    }
  }catch(error){
    res.status(500).json("server error");
  }
}