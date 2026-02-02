import { useEffect } from "react";
import Header from "../components/header"
import OrderItems from "../components/orderItem";
import { useState } from "react";
import api from '../services/axios'

export default function Orders (){

  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    async function fetchOrders() {
      try {
        const {data : orderObj} = await api.get('user/orders/all');
         setOrders(orderObj.orders);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchOrders();
  },[])
  return(
    <>
      <Header /> 
      <h2 className="your-orders">Your Orders</h2>
      {
        orders?.length === 0 ? (
          <h1 className="no-orders">No Orders Yet</h1>            
        ) : (
          orders?.map((v,i)=>(
              <OrderItems key={i} orderDetails={v} />
            ))
        )
      }
    </>
  )
}