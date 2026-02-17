import { Schema, model, Document } from "mongoose";

export interface IAddress extends Document {
  name: string;
  number: string;
  pincode: string;
  city?: string;
  address?: string;
  state?: string;
  country?: string;
}

const addressSchema = new Schema<IAddress>({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    maxlength: 10,
    minlength: 10
  },
  pincode: {
    type: String,
    maxlength: 6,
    minlength: 6
  },
  city: String,
  address: String,
  state: String,
  country: String
});

export const Address = model<IAddress>("Address", addressSchema);
