import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from '../../../services/axios'
import errorFunction from "../../../utils/errorFunction";
import type { AppDispatch } from "../../store/store";

export type Product = {
  _id : string;
  isFav : boolean;
  img : string;
  category : string;
  rating : number;
  name : string;
  price : number;
}

export type Cart = {
  product : Product,
  quantity : number,
  _id : string
}

type State = {
  name : string;
  status :string;
  favorite : Product[];
  role : string;
  login : null | boolean;
  cart : Cart[];
  loading : boolean;
  error : null | string;
}
type UserPayload = {
  cart : Cart[];
  favorite : Product[];
  name : string;
  role : string;
  status : string
}

const initialState:State = {
  name : "",
  status : "",
  favorite : [],
  role : "",
  login : null,
  cart : [],
  loading : false,
  error : null
}


const userSlice = createSlice({
  name : "user",
  initialState,
  reducers :{
    fetchUserStart(state){
      state.loading = true ;
    },
    fetchUserSuccess(state,action:PayloadAction<UserPayload>){
      state.cart = action.payload.cart ;
      state.favorite = action.payload.favorite ;
      state.name = action.payload.name ;
      state.loading = false ;
      state.login = true ;
      state.role = action.payload.role ;
      state.status = action.payload.status ;
    },
    fetchUserFail(state,action:PayloadAction<string>){
      state.loading = false ;
      state.error = action.payload ;
    },
    setItemToCart(state,action:PayloadAction<Cart[]>){
      state.cart = action.payload ;
    },
    setUserLogout(state){
      state.name = "" ;
      state.status = "";
      state.favorite = [] ;
      state.role = "" ;
      state.login = null ;
      state.cart = [] ;
      state.loading = false ;
      state.error = null;
    }
  }
});


export const checkAuth = () => async (dispatch:AppDispatch)=>{
  try{
    dispatch(fetchUserStart())
    const {data} = await api.get<UserPayload>("/user/details");
    dispatch(fetchUserSuccess(data));
  }catch(error){
    dispatch(fetchUserFail(errorFunction(error)));
  }
}

export const addToCartThunk = (id:string,qnt:number|string) => async (dispatch:AppDispatch)=>{
  try{
   const {data} = await api.post<{cart:Cart[]}>(`/cart`, { id, quantity: qnt || 1 });
   dispatch(setItemToCart(data.cart));
  }catch(error){
    console.log(errorFunction(error));
  }
}

export const removeFromCartThunk = (id:string) => async (dispatch:AppDispatch) =>{
  try{
   const {data} = await api.put<{cart : Cart[]}>('/cart', { id });
   dispatch(setItemToCart(data.cart));
  }catch(error){
    console.log(errorFunction(error));
  }
}

export const {fetchUserFail,fetchUserStart,fetchUserSuccess,setItemToCart,setUserLogout} = userSlice.actions ;
export default userSlice.reducer ;