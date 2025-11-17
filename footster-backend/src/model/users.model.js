const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id : Number,
  cart : Array,
  favorite : Array,
  orders : Array,
  address : Object,
  role : String,
  email : String,
  password : String,
  login : Boolean
},{
  collection : "users"
});

const User = mongoose.model("User",userSchema);

module.exports = User ;