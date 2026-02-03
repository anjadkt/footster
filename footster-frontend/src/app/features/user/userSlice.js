import { createSlice } from "@reduxjs/toolkit";
import api from '../../../services/axios.js'

const userSlice = createSlice({
  name : "user",
  initialState : {
    name : "",
    status : true,
    favorite : [],
    role : "",
    login : null,
    cart : [],
    loading : false,
    error : null
  },
  reducers :{
    fetchUserStart(state){
      state.loading = true ;
    },
    fetchUserSuccess(state,action){
      state.cart = action.payload.cart ;
      state.favorite = action.payload.favorite ;
      state.name = action.payload.name ;
      state.loading = false ;
      state.login = true ;
      state.role = action.payload.role ;
      state.status = action.payload.status ;
    },
    fetchUserFail(state,action){
      state.loading = false ;
      state.error = action.payload ;
    },
    setItemToCart(state,action){
      state.cart = action.payload ;
    },
    setUserLogout(state){
      state.name = "" ;
      state.status = true;
      state.favorite = [] ;
      state.role = "" ;
      state.login = null ;
      state.cart = [] ;
      state.loading = false ;
      state.error = null;
    }
  }
});


export const checkAuth = () => async (dispatch)=>{
  try{
    dispatch(fetchUserStart())
    const {data} = await api.get("/user/details");
    dispatch(fetchUserSuccess(data));
  }catch(error){
    dispatch(fetchUserFail());
  }
}

export const addToCartThunk = (id,qnt) => async (dispatch)=>{
  try{
   const {data} = await api.post(`/cart`, { id, quantity: qnt || 1 });
   dispatch(setItemToCart(data.cart));
  }catch(error){
    console.log(error.message);
  }
}

export const removeFromCartThunk = (id) => async (dispatch) =>{
  try{
   const {data} = await api.put('/cart', { id });
   console.log(data);
   dispatch(setItemToCart(data.cart));
  }catch(error){
    console.log(error.message);
  }
}

export const {fetchUserFail,fetchUserStart,fetchUserSuccess,setItemToCart,setUserLogout} = userSlice.actions ;
export default userSlice.reducer ;