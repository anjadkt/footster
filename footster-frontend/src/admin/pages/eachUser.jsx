import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SideBar from "../components/sidebar";
import '../styles/eachuser.css'

export default function EachUser(){
  const [user,setUser] = useState({});
  const {id} = useParams();
  async function fetchUser() {
    const {data} = await axios.get(`http://localhost:3001/admin/users/${id}`,{withCredentials : true});
    setUser(data.user[0]);
  }

  async function blockUser(){
   try{
    await axios.get(`http://localhost:3001/admin/users/${id}/block`,{withCredentials : true});
    fetchUser();
   }catch(error){
    console.log(error.message);
   }
  }

  function setOrder(orderStatus,id){
    // const orders = user.orders.toSpliced(i,1,{
    //   ...user.orders[i],
    //   status : orderStatus
    // });
    // const noti = [...user.noti];
    // noti.push({
    //   title : `Order ${orderStatus}`,
    //   dis :`hello ${user.name}, your order ${user.orders[i].orderId} has been ${orderStatus} successfully`
    // });
    try{
      axios.put('http://localhost:3001/admin/users/updateStatus',{
        id,
        status : orderStatus
      },{withCredentials : true});
    }catch(error){
      console.log(error.message);
    }
    fetchUser();
  }

  // function messageUser(e){
  //   const noti = [...user.noti] 
  //   noti.push({
  //     title : e.target[0].value,
  //     dis : e.target[1].value
  //   });
  //   try{
  //     axios.put(`https://footster-app.onrender.com/users/${id}`,{
  //     ...user,
  //     noti
  //   })
  //   }catch(err){
  //     console.log(err.message);
  //   }

  // }

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
          <p>ID : {user._id}</p>
          <p> Email - {user.email}</p>
          <p>status - <span className="user-status" style={{backgroundColor : user.status == "Active" ? "#78eda5ff":"red"}}>{user.status}</span></p>
          <br />
          <button onClick={blockUser} className="block-user">{user.status == "Active" ? "Block User": "Unblock User"}</button>
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
          user && user?.orderDetails && user.orderDetails?.map((v,i)=>(
            <div key={i} className="user-admin-orders">
              <div className="user-admin-orders-details">
                <div>order ID :<br/>{v._id}</div>
                <div>Date : <br/>{v.date}</div>
                <div>Total Price : <br/>{v.paymentDetails?.total}</div>
                <div>Type : <br/>{v.paymentDetails?.paymentType}</div>
                <div>Status : <br/>Order {v.status}</div>
              </div>
              <div className="user-admin-orders">
                {
                  v.items.map((d,i)=>(
                    <div key={i} className="product-admin-order-details">
                      <div className="img-div"><img  src={d.img} alt="name" /></div>
                      <div className="admin-products">
                        <div>{d.name}</div>
                        <div>Price : {d.price}</div>
                        <div>Quantity :{d.quantity}</div>
                        <div>Category : {d.category}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="user-admin-shpping-details">
                <div onClick={()=>setOrder("Placed",v._id)} style={{backgroundColor : v.status == "Placed" ? "green":"none"}}>Placed</div>
                <div style={{backgroundColor : v.status == "Shipped" ? "green":"none"}} onClick={()=>setOrder("Shipped",v._id)}>Shipped</div>
                <div style={{backgroundColor : v.status == "Reached" ? "green":"none"}} onClick={()=>setOrder("Reached",v._id)}>Reached</div>
                <div style={{backgroundColor : v.status == "Delivered" ? "green":"none"}} onClick={()=>setOrder("Delivered",v._id)}>Delivered</div>
              </div>
            </div>
          ))
        }
      </div>
     </div>
    </>
  )
}