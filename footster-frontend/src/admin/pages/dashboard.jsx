import { useEffect, useState } from "react"
import SideBar from "../components/sidebar"
import '../styles/dashboard.css'
import { useNavigate } from "react-router-dom";
import DoughnutChart from "../components/chart";
import api from '../../services/axios'

export default function Dashboard(){
  const [data,setData] = useState({});
  const navigate = useNavigate();

  async function takeData() {
    const {data : dashboardData} = await api.get('/admin/dashboard');
    setData(dashboardData)
  }

  useEffect(()=>{
    takeData();
    document.title = "Admin panel"
  },[]);
  
  return(
    <>
     <SideBar />
     <div className="pl-[260px] p-4 bg-[#f9fafb] text-[#111827]">

      <h1 className="text-2xl font-extrabold">Dashboard</h1>
      <hr />

      <div className="flex flex-col gap-2 pt-4">

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">

          <div className="bg-white rounded-xl p-4 py-8 gap-2 flex flex-col items-center justify-center transition-all ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow=2xl shadow-2xl" onClick={()=>navigate('/users')}>
            <img className="w-10 h-10 object-contain pb-2" src="./icons/users.png" alt="users" />
            <div className="text-lg font-bold text-[#6b7280] mb-1">Customers</div>
            <h2 className="text-xl font-extrabold text-[#111827]">{ data.totalUsers}</h2>
          </div>

          <div className="bg-white rounded-xl p-4 py-8 gap-2 flex flex-col items-center justify-center transition-all ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow=2xl shadow-2xl" onClick={()=>navigate('/adminOrders')}>
            <img className="w-10 h-10 object-contain pb-2" src="./icons/orders.png" alt="orders" />
            <div className="text-lg font-bold text-[#6b7280] mb-1">Orders</div>
            <h2 className="text-xl font-extrabold text-[#111827]">{data.totalOrders}</h2>
          </div>

          <div className="bg-white rounded-xl p-4 py-8 gap-2 flex flex-col items-center justify-center transition-all ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow=2xl shadow-2xl" onClick={()=>navigate('/allproducts')}>
            <img className="w-10 h-10 object-contain pb-2" src="./icons/products.png" alt="products" />
            <div className="text-lg font-bold text-[#6b7280] mb-1">Products</div>
            <h2 className="text-xl font-extrabold text-[#111827]">{ data.totalProducts}</h2>
          </div>

          <div className="bg-white rounded-xl p-4 py-8 gap-2 flex flex-col items-center justify-center transition-all ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow=2xl shadow-2xl">
            <img className="w-10 h-10 object-contain pb-2" src="./icons/products.png" alt="users" />
            <div className="text-lg font-bold text-[#6b7280] mb-1">Total income</div>
            <h2 className="text-xl font-extrabold text-[#111827]" style={{color : 'green'}}>&#8377;{data.totalRevenue}</h2>
          </div>

          <div className="bg-white rounded-xl p-4 py-8 gap-2 flex flex-col items-center justify-center transition-all ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow=2xl shadow-2xl">
            <img className="w-10 h-10 object-contain pb-2" src="./icons/products.png" alt="users" />
            <div className="text-lg font-bold text-[#6b7280] mb-1">Total expense</div>
            <h2 className="text-xl font-extrabold text-[#111827]" style={{color : 'brown'}}>&#8377;{data.totalRevenue*0.6}</h2>
          </div>

          <div className="bg-white rounded-xl p-4 py-8 gap-2 flex flex-col items-center justify-center transition-all ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow=2xl shadow-2xl">
            <img className="w-10 h-10 object-contain pb-2" src="./icons/products.png" alt="users" />
            <div className="text-lg font-bold text-[#6b7280] mb-1">Total earnings</div>
            <h2 className="text-xl font-extrabold text-[#111827]" style={{color : 'green'}}>&#8377;{data.totalRevenue*0.4}</h2>
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