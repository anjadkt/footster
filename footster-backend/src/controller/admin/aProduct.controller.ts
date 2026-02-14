import Product from '../../model/products.model'
import { Request,Response } from 'express';
import errorFunction from '../../types/errorFunction';
export default {
  addProduct : async (req:Request,res:Response)=>{
    try {
      const { img , category ,name , price } = req.body ;
      if(!category || !name || !price || !img)return res.status(400).json({message : "incomplete form!",status:400});

      const product = await Product.create({
        isFav : false ,
        reviews :[],
        img,
        category,
        rating : 2.0,
        name,
        price
      });
      res.status(200).json({
        message : "product added successfully!",
        status : 200,
        product
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },
  removeProduct : async (req:Request,res:Response)=>{
    try {
      const {id} = req.body ;
      const product = await Product.findOne({_id : id});
      if(!product)res.status(404).json({message : "Product not found!",status :404});

      const deletedProduct = await Product.deleteOne({_id : id});

      res.status(200).json({
        message : "Product removed!",
        status : 200,
        deletedProduct
      })

    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },
  updateProduct : async (req:Request,res:Response)=>{
    try {
      const {id , img , category , price , name } = req.body ;
      if(!id || !img || !category || !price ||!name)return res.status(400).json({message : "incomplete form!",status:400});

      const updatedProduct = await Product.updateOne({_id : id} , {
        name,
        category,
        price,
        img
      });

      res.status(200).json({
        message : "Product Updated!",
        updatedProduct,
        status : 200
      })
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  },
  getOneProduct : async (req:Request,res:Response)=>{
    try {
       const {id} = req.params ;
       const product = await Product.findOne({_id : id});
       if(!product)res.status(404).json({message : "Product not found!",status :404});

       res.status(200).json(product)
    } catch (error) {
      res.status(500).json(errorFunction(error));
    }
  }
}