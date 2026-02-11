import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model("Product",productSchema);

export default Product ;

