import {Document , Schema , model} from 'mongoose'

export interface IAdmin extends Document {
  name : string;
  role : string;
  email : string;
  password : string;
}

const adminSchema = new Schema<IAdmin>({
  name : {
    type : String,
    require : true
  },
  role : {
    type :String,
    require : true
  },
  email : {
    type :String,
    unique : true,
    require: true,
  },
  password : {
    type :String,
    require : true
  }
});

export default model<IAdmin>("Admin",adminSchema);