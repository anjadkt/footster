const User = require('../../model/users.model.js');
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

      const exist = await User.findOne({email});
      if(exist) return res.status(409).json({message : "Admin already Exist!",status : 409});

      const hash = await bcrypt.hash( password , 10 ); //make more strong !

      const admin = await User.create({
        email,
        name,
        password : hash,
        role : "admin",
        login : false,
      });

      res.json({
        message : "Admin registered Successfully!",
        status : 200
      })
    } catch (error) {
      res.status(500).json({
        message : error.message,
        status : 500
      })
    }
  }
}