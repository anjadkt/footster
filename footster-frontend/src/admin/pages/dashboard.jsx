import { useEffect, useState } from "react"
import SideBar from "../components/sidebar"
import '../styles/dashboard.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "../components/chart";

export default function Dashboard(){
  const [data,setData] = useState({});
  const navigate = useNavigate();

  async function takeData() {
    const {data : dashboardData} = await axios.get('https://footster-api.onrender.com/admin/dashboard',{withCredentials : true});
    setData(dashboardData)
  //   const calOrders = () =>{
  //     let orderCount = 0;
  //     users.data.forEach((v)=>{
  //       orderCount += v.orders.length
  //     });
  //     return orderCount;
  //   }

  //   const calRevenue = ()=>{
  //     let revenue = 0;
  //     users.data.forEach((v)=>{
  //       v.orders.forEach((o)=>{
  //         console.log(o);
  //         revenue += o.total
  //       })
  //     });
  //     return revenue;
  //   }

  //   setData({ 
  //     products : products.data.length,
  //     userCount : users?.data.length - 1,
  //     orders : calOrders(),
  //     revenue : calRevenue()
  //   });

  }
  useEffect(()=>{
    takeData();
    document.title = "Admin panel"
  },[]);
  
  return(
    <>
     <SideBar />
     <div className="dashboard-all-container">
      <h1>Dashboard</h1>
      <hr />
      <div className="dashboard-details-container">
        <div className="dashboard-cus-or-pro-container">
          <div onClick={()=>navigate('/users')}>
            <img src="./icons/users.png" alt="users" />
            <div>Customers</div>
            <h2>{ data.totalUsers}</h2>
          </div>
          <div onClick={()=>navigate('/adminOrders')}>
            <img src="./icons/orders.png" alt="orders" />
            <div>Orders</div>
            <h2>{data.totalOrders}</h2>
          </div>
          <div onClick={()=>navigate('/allproducts')}>
            <img src="./icons/products.png" alt="products" />
            <div>Products</div>
            <h2>{ data.totalProducts}</h2>
          </div>
          <div>
            <img src="./icons/products.png" alt="users" />
            <div>Total income</div>
            <h2 style={{color : 'green'}}>&#8377;{data.totalRevenue}</h2>
          </div>
          <div>
            <img src="./icons/products.png" alt="users" />
            <div>Total expense</div>
            <h2 style={{color : 'brown'}}>&#8377;{data.totalRevenue*0.6}</h2>
          </div>
          <div>
            <img src="./icons/products.png" alt="users" />
            <div>Total earnings</div>
            <h2 style={{color : 'green'}}>&#8377;{data.totalRevenue*0.4}</h2>
          </div>
        </div>
        <div></div>
      </div>
     </div>
     <div className="dashboard-all-chart-container">
      <h2>Dashboard Summary</h2>
     <DoughnutChart details={data} />
     </div>
    </>
  )
}