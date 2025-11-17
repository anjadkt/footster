import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/header";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import '../styles/eachProduct.css'

export default function EachProduct (){
  const {id} = useParams();
  const [product,setProduct] = useState({});
  const [fav,setFav] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function takeProduct (){
      const {data} = await axios.get(`https://footster-app.onrender.com/products/${id}`);
      setProduct(data);

      const user = JSON.parse(localStorage.getItem('user'));
      const favProduct = user.favorite.find(d => d.id === data.id);
      setFav(!!favProduct);
    }
    takeProduct();

    document.body.style.backgroundColor = "rgba(242, 242, 242, 0.58)"; 

    return () => {
      document.body.style.backgroundColor = "";
    };
  },[]);

  function setFavorite(){
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!updatedUser.login) {
      navigate('/login');
      return;
    }
    let {favorite} = updatedUser ;

    if(!fav){
      favorite.push({...product , isFav : true});
    }else{
      favorite = favorite.filter(d => d.id !== product.id);
    }
    localStorage.setItem('user',JSON.stringify(
      {...updatedUser,favorite:[...favorite]}
    ))
    setFav(!fav)
  }

  function addToCart() {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    if (!updatedUser.login) {
      navigate('/login');
      return;
    }
  
    const exist = updatedUser.cart.find(eproduct => eproduct.id === product.id);
  
    if (exist) {
      exist.quantity += 1;
    } else {
      const newProduct = { ...product};
      updatedUser.cart.push(newProduct);
    }
  
    toast.success("Added to Cart")
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
  return (
    <>
     <Header />
     <div className="single-product-container-div">
      <div className="single-product-img-div">
        <div className="single-product-fav-img-div">
          <img className="single-product-img" src={product.img} alt="" />
          <div onClick={setFavorite} className="single-product-fav">
            {
              fav ? <img src="/icons/favorite.png"/> : <img src="/icons/favorite3.png"/> 
            }
          </div>
        </div>
        <div className="single-product-cart-buy-btn">
          <button onClick={addToCart} className="add-to-cart">Add to cart</button>
          <button onClick={addToCart} className="buy-it-now">Buy it Now</button>
        </div>
      </div>
      <div className="single-product-details-div">
        <h2>{product.name}</h2>
        <div className="dis">Step into all-day comfort with these lightweight sneakers. Designed with breathable mesh and a cushioned sole, they keep your feet fresh while giving your outfit a modern, laid-back edge.</div>
        <h1 className="price">&#8377;<span>{product.price}/-</span></h1>
        <div><img className="rating-img" src={`/ratings/rating-${product.rating}.png`} alt="" /></div>
        <div>Colors : {product.color}</div>
        <div className="review-input-div">
          <input type="text" placeholder="Post a review about this product"/>
        </div>
      </div>
     </div>
     <div className="all-reviews-container">
      <h2>reviews</h2>
     </div>
     <ToastContainer autoClose={1000}/>
    </>
  )
}