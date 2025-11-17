import axios from "axios";
import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import '../styles/allorders.css'

export default function AdminOrders(){
  const [allUser,setAlluser] = useState([]);

  async function fetchData(){
    const {data} = await axios.get('https://footster-app.onrender.com/users');
    data.shift();
    setAlluser(data);
  }
  useEffect(()=>{
    fetchData();
  },[])

  function setOrder(orderStatus,i,user){
    const orders = user.orders.toSpliced(i,1,{
      ...user.orders[i],
      status : orderStatus
    });
    const noti = [...user.noti];
    noti.push({
      title : `Order ${orderStatus}`,
      dis :`hello ${user.name}, your order ${user.orders[i].orderId} has been ${orderStatus} successfully`
    });
    axios.put(`https://footster-app.onrender.com/users/${user.id}`,{
      ...user,
      orders,
      noti
    });
    fetchData();
  }


  return(
    <>
     <SideBar/>
     <div className="all-orders-admin-container">
      <h1>All Orders</h1>
      <div className="order-filtering-admin">
        <div>
          All
        </div>
        <div>
          Placed
        </div>
        <div>
          Shipped 
        </div>
        <div>
          Reached 
        </div>
        <div>
          Delivered
        </div>
      </div>
      <hr />
      {
        allUser && allUser.map((user,i)=>(
          <div className="user-orders-container-div">
        {
          user.orders && user.orders.map((v,i)=>(
            <div key={i} className="user-admin-orders">
              <div className="user-admin-orders-details">
                <div>User :<br/>{user.name}</div>
                <div>Date : <br/>{v.date}</div>
                <div>Total Price : <br/>{v.total}</div>
                <div>Type : <br/>{v.type}</div>
                <div>Status : <br/>Order {v.status}</div>
              </div>
              <div className="user-admin-orders">
                {
                  v.cart.map((d,i)=>(
                    <div key={i} className="product-admin-order-details">
                      <div className="img-div"><img  src={d.img} alt="name" /></div>
                      <div className="admin-products">
                        <div>{d.name}</div>
                        <div>Price : {d.price}</div>
                        <div>Quantity :{d.quantity}</div>
                        <div>Colros : {d.color}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="user-admin-shpping-details">
                <div style={{backgroundColor : v.status == "Placed" ? "green":"none"}}>Placed</div>
                <div style={{backgroundColor : v.status == "Shipped" ? "green":"none"}} onClick={()=>setOrder("Shipped",i,user)}>Shipped</div>
                <div style={{backgroundColor : v.status == "Reached" ? "green":"none"}} onClick={()=>setOrder("Reached",i,user)}>Reached</div>
                <div style={{backgroundColor : v.status == "Delivered" ? "green":"none"}} onClick={()=>setOrder("Delivered",i,user)}>Delivered</div>
              </div>
            </div>
          ))
        }
      </div>
        ))
      }
     </div>
      
    </>
  )
}