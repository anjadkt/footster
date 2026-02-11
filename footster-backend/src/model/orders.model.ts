import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  date : String,
  status : String,
  paymentDetails : {
    paymentType : String,
    total : Number
  },
  items: [{
    type: Object,
    required: true
  }],
  to : Object
});

export default  mongoose.model("Order",orderSchema);