import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"

export default function CartItem({data,dispatch,index}){
  const navigate = useNavigate();
  return (
    <>
     <div className="cart-product-container">
      <h3>Delivery date: Tuesday, June 21</h3>
      <div className="product-details-container">
        <div onClick={()=>navigate(`/product/${data.id}`)} className="cart-img-div">
          <img className="cart-product-img" src={data.img} alt="product image" />
        </div>
        <div className="product-details-div">
          <p>{data.name}</p>
          <h4>&#8377;{data.price}</h4>
          <div className="quantity-div">
            Quantity :
            <button onClick={()=>dispatch({type : "dec",data :data,index :index})}>-</button>
            <span>{data.quantity}</span>
            <button onClick={()=>dispatch({type : "inc",data :data,index :index})} >+</button>
          </div>
          <div className="save-remove-div">
            <button className="save-later" onClick={()=>dispatch({type : "save",data :data,index :index})}>Save for Later</button>
            <button onClick={()=>{
              toast.warning("Item removed");
              dispatch({type : "remove",index : index})
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