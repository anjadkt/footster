const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  isFav : Boolean,
  reviews : Array,
  img : String,
  quantity : Number,
  category : String,
  rating : Number,
  name : String,
  price : Number
},{
  collection : "products"
});

const Product = mongoose.model("Product",productSchema);

module.exports = Product ;

