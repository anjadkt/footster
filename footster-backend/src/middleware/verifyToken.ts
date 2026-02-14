import jwt from 'jsonwebtoken'
import getEnv from '../config/dotenv';
import { NextFunction , Request , Response } from 'express';

export default (req:Request,res:Response,next:NextFunction)=>{
  try{
    const token = req.cookies.token || req.cookies.Admin_token ;
    if(token){
      const decoded = jwt.verify(token,getEnv("SECRET_KEY"))
      if(!decoded)return res.status(401).json({message : "token invalid!",status : 401});
      req.user = decoded ;
      next();

    }else{
      return res.status(401).json({message : "token expired!",status : 401});
    }
  }catch(error){
    res.status(500).json("server error");
  }
}