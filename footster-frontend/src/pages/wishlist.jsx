import { useState } from "react";
import Header from "../components/header"
import Product from "../components/product";
import '../styles/wishlist.css'
import { useEffect } from "react";
import api from "../services/axios";


export default function Wishlist (){

  const [favorite,setFavorite] = useState([]);

  useEffect(()=>{
    async function fetchFav() {
      try{
        const {data} = await api.get('/wishlist');
        setFavorite(data.favorite);
      }catch(error){
        console.log(error.message);
      }
    }
    fetchFav();
  },[])

  return (
    <>
     <Header />
     <h1 className="wishlist">Wishlist</h1>
     <hr />
     <div className="wishlist-product-container">
      {
        favorite?.length>0 ? (
          
            favorite.map((v,i) =>(
              <Product key={i} data={v}/>
            ))
          
        ) : (
          <h2 className="empty-wishlist">Wishlist is Empty!</h2>
        )
      }
     </div>
    </>
  )
}