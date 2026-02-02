import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import api from '../services/axios'
import { useState } from "react";

export default function CartItem({data,setCart}){
  const [qnt,setQnt] = useState(data.quantity);
  const navigate = useNavigate();
  async function incOrDec(action) {
    try{
     const {data:productObj} = await api.post(`/cart/${action}`,{
        "id" : data.product._id
      });
      setQnt(productObj.quantity);
      setCart();

    }catch(error){
      console.log(error.message);
    }
  }

  async function removeProduct() {
    try{
      const {data:delteProduct} = await api.put('/cart',{"id" : data.product._id});
      setCart();
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <>
     <div className="cart-product-container">
      <h3>Delivery date: Tuesday, June 21</h3>
      <div className="product-details-container">
        <div onClick={()=>navigate(`/product/${data.product._id}`)} className="cart-img-div">
          <img className="cart-product-img" src={data.product.img} alt="product image" />
        </div>
        <div className="product-details-div">
          <p>{data.product.name}</p>
          <h4>&#8377;{data.product.price}</h4>
          <div className="quantity-div">
            Quantity :
            <button onClick={()=>incOrDec("dec")}>-</button>
            <span>{qnt}</span>
            <button onClick={()=>incOrDec("inc")} >+</button>
          </div>
          <div className="save-remove-div">
            <button className="save-later">Save for Later</button>
            <button onClick={()=>{
              toast.warning("Item removed");
              removeProduct()
            }}>Remove</button>
          </div>
        </div>
        <div className="Product-delivery-div">
          <h4>Choose a delivery option :</h4>
          <div>
            <label htmlFor="delivery1">
              <input id="delivery1" type="radio" defaultChecked />
              <p>Tuesday, June 21<br /><span>FREE Shipping</span></p>
            </label>
          </div>
          <div>
            <label htmlFor="delivery2">
              <input id="delivery2" type="radio" />
              <p>Monday, June 17<br /><span>&#8377;189 - Shipping</span></p>
            </label>
          </div>
          <div>
            <label htmlFor="delivery3">
              <input id="delivery3" type="radio" />
              <p>Sunday, June 15<br /><span>&#8377;289 - Shipping</span></p>
            </label>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
     </div>
    </>
  )
}