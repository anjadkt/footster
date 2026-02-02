import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/axios'

export default function AdminOrders() {
  const [allorders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const { data } = await api.get('/admin/order/all');
      setAllOrders(data.orders);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  async function setOrder(orderStatus, id) {
    try {
      await api.put('/admin/users/updateStatus', {
        id,
        status: orderStatus
      });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }

  const filters = ["All", "Placed", "Shipped", "Reached", "Delivered"];

  return (
    <>
      <SideBar />
      <div className="ml-[280px] p-8 min-h-screen bg-gray-50 text-gray-900 font-sans">
        <h1 className="text-3xl font-bold mb-4">All Orders</h1>

        {/* Sticky Filtering Bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 px-6 flex items-center gap-4 border-b border-gray-200 mb-6 rounded-lg shadow-sm">
          {filters.map((f) => (
            <div 
              key={f}
              className="border border-gray-600 px-4 py-1.5 rounded-md text-sm font-medium text-gray-700 cursor-pointer transition-all duration-300 hover:bg-black hover:text-white"
            >
              {f}
            </div>
          ))}
        </div>

        <hr className="border-none h-[1px] bg-gray-200 mb-8" />

        <div className="flex flex-col gap-6">
          {allorders && allorders.map((v, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* Order Header Info */}
              <div className="grid grid-cols-5 gap-4 p-5 bg-gray-50 border-b border-gray-100 text-sm">
                <div>
                  <span className="text-gray-500 uppercase text-[10px] font-bold block mb-1">Order ID</span>
                  <span className="font-mono font-medium">{v._id.slice(0, 12)}...</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[10px] font-bold block mb-1">Date</span>
                  <span className="font-medium">{v.date}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[10px] font-bold block mb-1">Total Price</span>
                  <span className="font-bold text-gray-900 text-base">₹{v.paymentDetails?.total}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[10px] font-bold block mb-1">Payment</span>
                  <span className="font-medium px-2 py-0.5 bg-gray-200 rounded text-[11px]">{v.paymentDetails?.paymentType}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[10px] font-bold block mb-1">Current Status</span>
                  <span className="font-semibold text-gray-800 italic">Order {v.status}</span>
                </div>
              </div>

              {/* User Link Section */}
              <div className="px-5 py-3 border-b border-gray-50">
                <button 
                  onClick={() => navigate(`/users/${v.userId}`)}
                  className="text-xs font-semibold px-3 py-1.5 border border-gray-400 rounded-md text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  View User Profile: {v.userId}
                </button>
              </div>

              {/* Product Items */}
              <div className="p-5 flex flex-wrap gap-6 bg-white">
                {v.items.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100 min-w-[300px] flex-1">
                    <div className="w-16 h-16 bg-white rounded overflow-hidden border border-gray-200 shrink-0">
                      <img className="w-full h-full object-contain" src={d.img} alt={d.name} />
                    </div>
                    <div className="text-sm">
                      <div className="font-bold text-gray-900">{d.name}</div>
                      <div className="text-gray-600">Price: ₹{d.price}</div>
                      <div className="text-gray-600">Qty: {d.quantity}</div>
                      <div className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">{d.category}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Update Actions */}
              <div className="flex bg-gray-100 border-t border-gray-200">
                {["Placed", "Shipped", "Reached", "Delivered"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrder(status, v._id)}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all
                      ${v.status === status 
                        ? "bg-gray-900 text-white" 
                        : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 border-r border-gray-200 last:border-r-0"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}