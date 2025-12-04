import axios from "axios";
import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/allorders.css'

export default function AdminOrders(){
  const [allorders,setAllOrders] = useState([]);
  const navigate = useNavigate();

  async function fetchData(){
    try{
      const {data} = await axios.get('https://footster-api.onrender.com/admin/order/all',{withCredentials : true});
      setAllOrders(data.orders);
    }catch(error){
      console.log(error.message);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])

  async function setOrder(orderStatus,id){
    
    try{
      await axios.put('https://footster-api.onrender.com/admin/users/updateStatus',{
        id,
        status : orderStatus
      },{withCredentials : true});
    }catch(error){
      console.log(error.message);
    }
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
      {/* {
        allorders && allorders.map((user,i)=>(
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
      } */}
      <div className="user-orders-container-div">
        {
          allorders && allorders?.map((v,i)=>(
            <div key={i} className="user-admin-orders">
              <div className="user-admin-orders-details">
                <div>order ID :<br/>{v._id.slice(0,8)+"...."}</div>
                <div>Date : <br/>{v.date}</div>
                <div>Total Price : <br/>{v.paymentDetails?.total}</div>
                <div>Type : <br/>{v.paymentDetails?.paymentType}</div>
                <div>Status : <br/>Order {v.status}</div>
              </div>
              <div className="user-admin-orders-details">
                <div onClick={()=>navigate(`/users/${v.userId}`)} className="user-id-btn">User ID : ${v.userId}</div> 
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