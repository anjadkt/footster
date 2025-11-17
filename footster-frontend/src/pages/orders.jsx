import Header from "../components/header"
import OrderItems from "../components/orderItem";
import { useState } from "react";
export default function Orders (){
  const [userObj,setUserObj] = useState(JSON.parse(localStorage.getItem('user')));
  return(
    <>
      <Header /> 
      <h2 className="your-orders">Your Orders</h2>
      {
        userObj.orders.length === 0 ? (
          <h1 className="no-orders">No Orders Yet</h1>            
        ) : (
          userObj.orders.map((v,i)=>(
              <OrderItems key={i} orderDetails={v} />
            ))
        )
      }
    </>
  )
}