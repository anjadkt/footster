const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    trim : true,
    require : true
  },
  cart : Array,
  favorite : Array,
  orders : Array,
  address : Object,
  role : String,
  email : {
    type : String,
    unique : true,
    require : true
  },
  password : {
    type : String,
    require : true
  },
  login : Boolean
},{
  collection : "users"
});

const User = mongoose.model("User",userSchema);

module.exports = User ;