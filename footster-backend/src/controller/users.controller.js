require('dotenv').config();
const {SECRET_KEY} = process.env ;
const User = require('../model/users.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = {
  userRegister : async(req,res)=>{

    try {
      const {email , password , name} = req.body ;
      if(!email || !password || !name )return res.status(406).json({message : "invalid format!",status : 406});

      if(!validator.isEmail(email)) return res.status(406).json({message : "invalid email format!",status : 406});

      const exist = await User.findOne({email});
      if(exist) return res.status(409).json({message : "User already Exist!",status : 409});

      const hash = await bcrypt.hash( password , 10 ); //make more strong !

      const user = await User.create({
        email,
        name,
        password : hash,
        address : {},
        role : "user",
        login : false,
      });

      // const TOKEN = jwt.sign({email , name , id : user._id , role : "user" } , SECRET_KEY , {expiresIn : "2h"});

      // res.cookie("token",TOKEN,{maxAge : 1000 * 60 * 60 * 2});

      res.status(200).json({
        message : "User registered Successfully!",
        status : 200
      })
    } catch (error) {
      res.status(500).json({
        message : error.message,
        status : 500
      })
    }
  },
  userLogin : async (req,res) => {
    try {

      // const token = req.cookies.token
      // if(token){
      //   jwt.verify(token,SECRET_KEY,(err,data)=>{
      //     if(err)return res.status(406).json({message : "token invalid!",status : 406});
      //     if(data)return res.status(200).json({message : "direct login success!",status : 200 , token});
      //   })
      // }

      const { email , password } = req.body ; 
      
      if(!email.trim() || !password.trim() )return res.status(406).json({message : "invalid format",status :406});

      const user = await User.findOne({email});
      if(!user)return res.status(404).json({message : "User Not Found!",status : 404});

      if(user.status === "Blocked")return res.status(403).json({message : "User is Blocked",status : 403});

      const isValidPass = await bcrypt.compare(password,user.password);
      if(!isValidPass)return res.status(401).json({message : "Invalid Password!",status : 401});

      const TOKEN = jwt.sign({ email , name : user.name , id : user._id , role : user.role },SECRET_KEY , {expiresIn : "2h"});
      res.cookie((user.role === "admin"? "Admin_token" : "token"),TOKEN,{
        maxAge : 1000 * 60 * 60 * 2,
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });

      user.login = true ;
      await user.save();

      res.status(200).json({message : "User login successfull!",token : TOKEN , status : 200 , name : user.name,role : user.role})

    } catch (error) {

      res.status(500).json({message : error.message , status : 500});

    }

  },
  userLogout : async(req,res)=>{
    try{
      
      const id = req.user.id
      const user = await User.findOne({_id : id});
      if(!user)return res.status(404).json({message : "User Not Found!",status : 404});
      user.login = false ;
      await user.save();

      res.clearCookie((user.role === "admin" ? "Admin_token" : 'token'),{
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
      
      res.status(200).json({
        message : "Logout Successfull",
        status : 200
      });
    }catch(error){
      res.status(500).json({message : error.message , status :500});
    }
  }
}