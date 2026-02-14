import mongoose,{Document , Schema , model , Types } from 'mongoose'
import { Product } from '../types/product';
import { IAddress } from './address.model';

export interface IOrder extends Document {
  userId:Types.ObjectId;
  date : string;
  status :string;
  paymentDetails:{
    paymentType : string;
    total :number;
  };
  items: Product[];
  to : IAddress
}

const orderSchema = new Schema<IOrder>({
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

export default model<IOrder>("Order",orderSchema);