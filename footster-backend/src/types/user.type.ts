export type UserJwt = {
  email :string;
  name :string;
  id :string;
  role :"admin" | "user"
}

export type Address = {
  name : string;
  number : number;
  pincode : number;
  city : string;
  adres : string;
  state : string;
  country : string;
}

export type UserType = {
  name : string;
  status : "Active" | "Blocked" ;
  cart : {
    product:string;
    quantity:number;
  }[];
  favorite : string[];
  orders:string[];
  address ?: Address;
  role : "admin" | "user";
  password : string;
  login : boolean;
}