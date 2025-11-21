const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  date : Date,
  status : String,
  paymentDetails : Object,
  items :Array,
  to : Object
});

module.exports =  mongoose.model("Order",orderSchema);