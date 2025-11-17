import { useState } from "react"
import "../styles/ordersec.css"
import {useNavigate} from 'react-router-dom'

export default function OrderSec(){
  const [date,setDate] = useState(()=> (new Date).toLocaleString());
  const {address,cart} = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  return (
    <>
      <div className="order-success-container">
       <div className="order-img-success">
        <img className="order-success-img" src="./order-success.png" alt="order success" />
        <h2>Order Confirmed!</h2>
       </div>

       <div className="order-success-summary">
        <h3>Order Summary</h3>
        <div className="c1">
          <div>Order ID :</div>
          <div>{Date.now()}</div>
        </div>
        <div className="c1">
          <div>Status :</div>
          <div>Order Placed</div>
        </div>
        <div className="c1">
          <div>Date :</div>
          <div>{date}</div>
        </div>
        <div className="c1">
          <div>type :</div>
          <div>{address.method}</div>
        </div>
       </div>

       <div className="order-success-summary">
        <h3>Delivery To :</h3>
        <div className="c1">Name : {address.name}</div>
        <div className="c1">Address : {address.adres}</div>
        <div className="c1">Phone : {address.number}</div>
       </div>

       <div >
        <h3>Items</h3>
        <div>
          {
            cart.map((v,i)=>(
              <div key={i}>
                <div className="c1" >{v.name} x {v.quantity}</div>
              </div>
            ))
          }
        </div>
       </div>

       <div className="amount-total">
        <button className='back-to-home-btn' onClick={()=>navigate('/')}>Back to Home</button>
         {
          address.method === "COD" ?  <h3>To be Paid : {address.total}</h3> : (<h3>Total Paid : {address.total}</h3>)
         }

       </div>
     </div>
    </>
  )
}