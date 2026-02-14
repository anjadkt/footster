import User, { UserType } from '../model/users.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import getEnv from '../config/dot';
import { Request,Response } from 'express';
import errorFunction from '../types/errorFunction';

export default {
  userRegister : async(req:Request,res:Response)=>{

    try {
      const {email , password , name} = req.body ;
      if(!email || !password || !name )return res.status(406).json({message : "invalid format!",status : 406});

      if(!validator.isEmail(email)) return res.status(406).json({message : "invalid email format!",status : 406});

      const exist = await User.findOne({email});
      if(exist) return res.status(409).json({message : "User already Exist!",status : 409});

      const hash = await bcrypt.hash( password , 10 );

      await User.create({
        email,
        name,
        password : hash,
        address : {},
        role : "user",
        login : false,
      });

      res.status(200).json({
        message : "User registered Successfully!",
        status : 200
      })
    } catch (error:unknown) {
      res.status(500).json(errorFunction(error))
    }
  },
  userLogin : async (req:Request,res:Response) => {
    try {

      const { email , password } = req.body ; 

      console.log(req.body);
      
      if(!email.trim() || !password.trim() )return res.status(406).json({message : "invalid format",status :406});

      const user = await User.findOne({email});
      if(!user || !user.password)return res.status(404).json({message : "User Not Found!",status : 404});

      if(user.status === "Blocked")return res.status(403).json({message : "User is Blocked",status : 403});

      const isValidPass = await bcrypt.compare(password,user.password);
      if(!isValidPass)return res.status(401).json({message : "Invalid Password!",status : 401});

      const TOKEN = jwt.sign({ email , name : user.name , id : user._id , role : user.role },getEnv("SECRET_KEY") , {expiresIn : "2h"});

      res.cookie((user.role === "admin"? "Admin_token" : "token"),TOKEN,{
        maxAge : 1000 * 60 * 60 * 2,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true
      });

      user.login = true ;
      await user.save();

      res.status(200).json({message : "User login successfull!",token : TOKEN , status : 200 , name : user.name,role : user.role})

    } catch (error) {

      res.status(500).json(errorFunction(error));

    }

  },
  userLogout : async(req:Request,res:Response)=>{
    try{
      
      const id = req.user?.id
      const user = await User.findOne({_id : id});
      if(!user)return res.status(404).json({message : "User Not Found!",status : 404});
      user.login = false ;
      await user.save();

      res.clearCookie((user.role === "admin" ? "Admin_token" : 'token'),{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true
      });
      
      res.status(200).json({
        message : "Logout Successfull",
        status : 200
      });
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  }
}