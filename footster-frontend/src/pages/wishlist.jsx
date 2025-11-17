import Header from "../components/header"
import Product from "../components/product";
import '../styles/wishlist.css'
export default function Wishlist (){
  const {favorite} = JSON.parse(localStorage.getItem('user')) || [];
  return (
    <>
     <Header />
     <h1 className="wishlist">Wishlist</h1>
     <hr />
     <div className="wishlist-product-container">
      {
        favorite?.length>0 ? (
          
            favorite.map(v =>(
              <Product data={v}/>
            ))
          
        ) : (
          <h2 className="empty-wishlist">Wishlist is Empty!</h2>
        )
      }
     </div>
    </>
  )
}