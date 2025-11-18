const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    trim : true,
    require : true
  },
  cart : [
    {
      product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
      },
      quantity :{
        type : Number,
        default : 1
      }
    }
  ],
  favorite : [
    {
      product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
      }
    }
  ],
  orders : Array,
  address : {
    name : String,
    number : {
      type : Number,
      maxlength : 10,
      minlength : 10
    },
    pincode : {
      type : Number ,
      maxlength : 6,
      minlength : 6
    },
    city : String,
    adres : String,
    state : String,
    country : String
  },
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