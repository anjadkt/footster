import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SideBar from "../components/sidebar";
import '../styles/eachuser.css'

export default function EachUser(){
  const [user,setUser] = useState({});
  const {id} = useParams();
  async function fetchUser() {
    const {data} = await axios.get(`https://footster-app.onrender.com/users/${id}`);
    setUser(data);
  }

  function blockUser(){
   axios.put(`https://footster-app.onrender.com/users/${id}`,{
      ...user,
      status : user.status == "active"? "blocked" : "active"
    });
    fetchUser();
  }

  function setOrder(orderStatus,i){
    const orders = user.orders.toSpliced(i,1,{
      ...user.orders[i],
      status : orderStatus
    });
    const noti = [...user.noti];
    noti.push({
      title : `Order ${orderStatus}`,
      dis :`hello ${user.name}, your order ${user.orders[i].orderId} has been ${orderStatus} successfully`
    });
    axios.put(`https://footster-app.onrender.com/users/${id}`,{
      ...user,
      orders,
      noti
    });
    fetchUser();
  }

  function messageUser(e){
    const noti = [...user.noti] 
    noti.push({
      title : e.target[0].value,
      dis : e.target[1].value
    });
    try{
      axios.put(`https://footster-app.onrender.com/users/${id}`,{
      ...user,
      noti
    })
    }catch(err){
      console.log(err.message);
    }

  }

  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <>
     <SideBar/>
     <div className="all-user-info-container-div">
      <div className="user-info-container-div">
        <div>
          <h1>{user.name}</h1>
          <p>ID : {user.id}</p>
          <p> Email - {user.email}</p>
          <p>status - <span className="user-status" style={{backgroundColor : user.status == "active" ? "#78eda5ff":"red"}}>{user.status}</span></p>
          <br />
          <button onClick={blockUser} className="block-user">{user.status == "active" ? "Block User": "Unblock User"}</button>
        </div>
        <div className="message-user">
          <form onSubmit={(e)=>messageUser(e)}>
            <label>Message user</label>
            <input required type="text" placeholder="Title"/>
            <textarea placeholder="discription" rows={5}></textarea>
            <input className="msg-submit" type="submit" value={'message'} />
          </form>
        </div>
      </div>
      <div className="user-orders-container-div">
        {
          user && user.orders && user.orders.map((v,i)=>(
            <div key={i} className="user-admin-orders">
              <div className="user-admin-orders-details">
                <div>order ID :<br/>{v.orderId}</div>
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
                <div onClick={()=>setOrder("Placed",i)} style={{backgroundColor : v.status == "Placed" ? "green":"none"}}>Placed</div>
                <div style={{backgroundColor : v.status == "Shipped" ? "green":"none"}} onClick={()=>setOrder("Shipped",i)}>Shipped</div>
                <div style={{backgroundColor : v.status == "Reached" ? "green":"none"}} onClick={()=>setOrder("Reached",i)}>Reached</div>
                <div style={{backgroundColor : v.status == "Delivered" ? "green":"none"}} onClick={()=>setOrder("Delivered",i)}>Delivered</div>
              </div>
            </div>
          ))
        }
      </div>
     </div>
    </>
  )
}