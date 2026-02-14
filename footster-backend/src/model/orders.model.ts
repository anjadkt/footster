import mongoose from 'mongoose'
import { InferSchemaType } from "mongoose";

const orderSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  date : {type : String,required:true},
  status : {type: String ,required:true},
  paymentDetails : {
    type: new mongoose.Schema({
    paymentType: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
    }, { _id: false }),
    required: true
  },
  items: [{
    type: Object,
    required: true
  }],
  to : Object
});

export type OrderType = InferSchemaType<typeof orderSchema>;

export default  mongoose.model("Order",orderSchema);