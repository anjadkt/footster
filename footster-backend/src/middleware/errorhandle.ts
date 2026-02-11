import { NextFunction,Request,Response } from "express";

export default (err:unknown,req:Request,res:Response,next:NextFunction) =>{
  if(err instanceof Error){
    const status = 500 ;
    const message = err.message || "Internal Server Error" ;
    res.status(status).json({
      message,
      status
    });
  }
}