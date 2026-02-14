import mongoose,{Document,Schema,model,Types} from "mongoose";
import { IAddress } from "./address.model";

export interface IUser extends Document {
  name : string;
  status : "Active" | "Blocked";
  cart : {
    product : Types.ObjectId;
    quantity : number ;
  }[];
  favorite : Types.ObjectId[];
  orders : Types.ObjectId[];
  address : IAddress;
  role : string ;
  email : string ;
  password : string;
  login : boolean ;
}

const userSchema = new Schema<IUser>({
  name : {
    type : String,
    trim : true,
    require : true
  },
  status :{
    type : "String",
    default : "Active"
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
      type : mongoose.Schema.Types.ObjectId,
      ref : "Product"
    }
  ],
  orders : [
    {
      type : mongoose.Schema.Types.ObjectId ,
      ref : "Order"
    }
  ],
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

const User = model<IUser>("User",userSchema);

export default User ;