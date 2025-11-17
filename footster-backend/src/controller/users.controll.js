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

      const token = jwt.sign({name , email} , SECRET_KEY , {expiresIn : "2h"});

      await User.create({
        email,
        name,
        password : hash,
        cart : [],
        favorite : [],
        role : "user",
        login : false,
      });

      res.cookie("token",token,{maxAge : 1000 * 60 * 60 * 2});

      res.json({
        message : "User registered Successfully!",
        token
      })
    } catch (error) {
      res.status(500).json({
        message : error.message,
        status : 500
      })
    }
  }
}