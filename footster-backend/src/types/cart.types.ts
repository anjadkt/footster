import { Types } from "mongoose";

export interface AddToCartBody {
  id: string;
  quantity?: number;
}

export interface RemoveItemBody {
  id: string;
}

export interface ICart {
  product : Types.ObjectId;
  quantity : number ;
}
