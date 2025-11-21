const Admin = require('../../model/admin.model.js');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const {SECRET_KEY} = process.env ;

module.exports = {
  adminRegister : async (req,res) =>{
    try {
      const {email , password , name} = req.body ;
      if(!email || !password || !name )return res.status(406).json({message : "invalid format!",status : 406});

      if(!validator.isEmail(email)) return res.status(406).json({message : "invalid email format!",status : 406});

      const exist = await Admin.findOne({email});
      if(exist) return res.status(409).json({message : "Admin already Exist!",status : 409});

      const hash = await bcrypt.hash( password , 10 ); //make more strong !

      const admin = await Admin.create({
        email,
        name,
        password : hash,
        role : "admin",
        login : false,
      });

      const TOKEN = jwt.sign({email , name , id : admin._id , role : "admin" } , SECRET_KEY , {expiresIn : "2h"});

      res.cookie("Admin_token",TOKEN,{maxAge : 1000 * 60 * 60 * 2});

      res.json({
        message : "Admin registered Successfully!",
        Admin_token : TOKEN
      })
    } catch (error) {
      res.status(500).json({
        message : error.message,
        status : 500
      })
    }
  },
  adminLogin : async (req,res) => {
    try {
      const Admin_token = req.cookies.Admin_token
      if(Admin_token){
        jwt.verify(Admin_token,SECRET_KEY,(err,data)=>{
          if(err)return res.status(406).json({message : "token invalid!",status : 406});
          if(data)return res.status(200).json({message : "direct login success!",status : 200 , Admin_token});
        })
      }

      const { email , password } = req.body ; 
      
      if(!email.trim() || !password.trim() )return res.status(406).json({message : "invalid format",status :406});

      const admin = await Admin.findOne({email});
      if(!admin)return res.status(404).json({message : "admin Not Found!",status : 404});

      const isValidPass = await bcrypt.compare(password,admin.password);
      if(!isValidPass)return res.status(403).json({message : "Invalid Password!",status : 403});

      const TOKEN = jwt.sign({ email , name : admin.name , id : admin._id , role : "admin" },SECRET_KEY , {expiresIn : "2h"});
      res.cookie("Admin_token",TOKEN,{maxAge : 1000 * 60 * 60 * 2});

      res.status(200).json({message : "Admin login successfull!",Admin_token : TOKEN , status : 200})

    } catch (error) {

      res.status(500).json({message : error.message , status : 500});

    }
  },
  adminLogout : async (req,res)=>{
    try{
      res.clearCookie('Admin_token');
      res.status(200).json({
        message : "Admin Logout Successfull",
        status : 200
      });
    }catch(error){
      res.status(500).json({message : error.message , status :500});
    }
  }
}