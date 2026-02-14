import { NextFunction,Request,Response } from 'express';
import User from '../model/users.model'
import errorFunction from '../types/errorFunction';

export default async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id} = req.user
    const user = await User.findOne({_id : id});
    if(!user)return res.status(404).json({message:"no user found!",status : 404});
    if(user.status === "Blocked")return res.status(403).json({message : "User is Blocked!",status : 403});
    next();
  } catch (error) {
    res.status(500).json(errorFunction(error));
  }

}