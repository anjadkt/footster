import {Document,Schema,model} from 'mongoose'
import { Product } from '../types/product';

export interface IProduct extends Product,Document {quantity : string|number}

const productSchema = new Schema<IProduct>({
  isFav : Boolean,
  reviews : Array,
  img : {
    type : String,
    require : true
  },
  category : {
    type : String,
    require : true
  },
  rating : Number,
  name : {
    type : String,
    require: true
  },
  price : {
    type : Number ,
    require : true
  }
},{
  collection : "products"
});

const Product = model<IProduct>("Product",productSchema);

export default Product ;

