const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id : Number,
  isFav : Boolean,
  reviews : Array,
  img : String,
  quantity : Number,
  category : String,
  rating : Number,
  name : String,
  color : Number,
  price : Number
},{
  collection : "products"
});

const Product = mongoose.model("Product",productSchema);

module.exports = Product ;

