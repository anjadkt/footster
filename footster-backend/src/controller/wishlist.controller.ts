import User from '../model/users.model'
import { Request,Response } from 'express';
import errorFunction from '../types/errorFunction';

export default {
  showList : async (req:Request,res:Response)=>{

    try{
      const user = await User.findById(req.user?.id).populate("favorite");
      res.status(200).json({
        favorite:user?.favorite,
        message : "favorite list send!",
        status : 200
      });

    }catch(error){
      res.status(500).json(errorFunction(error));
    }

  },
  addOrDltFav : async (req:Request,res:Response)=>{
    try {
      const {id} = req.body ;

      const exist = await User.findOne({_id : req.user?.id , "favorite" : id});
      if(exist){
        await User.updateOne({_id : req.user?.id},{$pull : {favorite : id }});
        res.status(200).json({
          message : "Product removed from wishList",
          status : 200,
          favorite : false
        });
        return ;
      }

      await User.findByIdAndUpdate(req.user?.id,{$push : {
        favorite : id
      }});

      res.status(200).json({
        message : "product added to wishlist!",
        status : 200,
        favorite : true
      });

    } catch (error) {
      res.status(500).json(errorFunction(error))
    }
  },
  removeFav : async (req:Request,res:Response)=>{
    try {
      const {id} = req.body ;
      const user = await User.findById(req.user?.id) ;
      if(!user)return res.status(404).json({message : "User not found!",status : 404});

      const newFav = user.favorite.filter((p) => p.toString() !== id );

      if(newFav.length === user.favorite.length)return res.status(404).json({message : "no Product found",status : 404});
      user.favorite = newFav ;
      await user.save();
      res.status(200).json({
        message : "Product removed from wishList",
        status : 200
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }

  },
  getFavProducts : async (req:Request,res:Response)=>{
    try{
      const id = req.user?.id;
      const user = await User.findOne({_id : id});
      if(!user)return res.status(404).json({message : "User not found!",status : 404});
      res.status(200).json({
        favorite : user.favorite,
        message : "User Favorite List",
        status : 200
      })
      
    }catch(error){
      res.status(500).json(errorFunction(error));
    }
  }
}