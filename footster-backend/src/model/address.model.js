const mongoose = require('mongoose');

const addresSchema = new mongoose.Schema({
    name :{
      type : String,
      require : true
    } ,
    number : {
      type : String,
      maxlength : 10,
      minlength : 10
    },
    pincode : {
      type : String,
      maxlength : 6,
      minlength : 6
    },
    city : String,
    adres : String,
    state : String,
    country : String
});

const Address = mongoose.model("Address",addresSchema);

module.exports = Address ;