import { NextFunction , Request , Response } from "express";
import errorFunction from "../types/errorFunction";

export default (req:Request,res:Response,next:NextFunction)=>{
  try {
    const {role} = req.user ;
    if( role !== "admin")return res.status(401).json({message : "Unauthorized Route!",status : 401});
    next();
  } catch (error) {
    res.status(500).json(errorFunction(error));
  }
}