import { useState } from "react"
import "../styles/ordersec.css"
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from "react";
import axios from "axios"

export default function OrderSec(){
  // const [date,setDate] = useState(()=> (new Date).toLocaleString());
  // const {address,cart} = JSON.parse(localStorage.getItem('user'));
  const [orderObj,setOrderObj] = useState({});
  const {id} = useParams();
  useEffect(()=>{
    async function fetchOrder() {
      try{
        const {data : orderDetails} = await axios.get(`https://footster-api.onrender.com/user/orders/${id}`,{withCredentials : true});
        setOrderObj(orderDetails.order);
        await axios.get('https://footster-api.onrender.com/cart/clear',{withCredentials : true});
      }catch(error){
        console.log(error.message);
      }
    }
    fetchOrder();
  },[])
  const navigate = useNavigate();
  return (
    <>
      <div className="order-success-container">
       <div className="order-img-success">
        <img className="order-success-img" src="/order-success.png" alt="order success" />
        <h2>Order Confirmed!</h2>
       </div>

       <div className="order-success-summary">
        <h3>Order Summary</h3>
        <div className="c1">
          <div>Order ID :</div>
          <div>{orderObj._id}</div>
        </div>
        <div className="c1">
          <div>Status :</div>
          <div>Order Placed</div>
        </div>
        <div className="c1">
          <div>Date :</div>
          <div>{orderObj.date}</div>
        </div>
        <div className="c1">
          <div>type :</div>
          <div>{orderObj.paymentDetails?.paymentType}</div>
        </div>
       </div>

       <div className="order-success-summary">
        <h3>Delivery To :</h3>
        <div className="c1">Name : {orderObj.to?.name}</div>
        <div className="c1">Address : {orderObj.to?.adres}</div>
        <div className="c1">Pincode : {orderObj.to?.pincode}</div>
       </div>

       <div >
        <h3>Items</h3>
        <div>
          {
           orderObj.items?.map((v,i)=>(
              <div key={i}>
                <div className="c1" >{v.name} x {v.quantity}</div>
              </div>
            ))
          }
        </div>
       </div>

       <div className="amount-total">
        <button className='back-to-home-btn' onClick={()=>navigate('/')}>Back to Home</button>
         {/* {
          address.method === "COD" ?  <h3>To be Paid : {address.total}</h3> : (<h3>Total Paid : {address.total}</h3>)
         } */}

       </div>
     </div>
    </>
  )
}