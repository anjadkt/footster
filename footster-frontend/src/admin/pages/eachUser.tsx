import api from '../../services/axios'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SideBar from "../components/sidebar";
import type { Product } from '../../app/features/user/userSlice';
import errorFunction from '../../utils/errorFunction';
import Spinner from '../../components/spinner';

type Address = {
  adres:string;
  city :string;
  country : string;
  name : string;
  number : number;
  pincode : number;
  state : string;
  userId : string;
  _id : string;
}

type OrderProduct = Product & {quantity : number} ;
export type Order ={
  _id : string;
  date : string;
  items : OrderProduct[];
  paymentDetails:{
    paymentType : string;
    total : number;
  },
  status : string;
  to : Address
}

type User = {
  address?:Address;
  email : string;
  login ?: boolean;
  name : string;
  role : string;
  status : string;
  _id : string;
  orderDetails : Order[];
}

export default function EachUser() {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();

  async function fetchUser():Promise<void> {
    try{
      const { data } = await api.get<{user:User}>(`/admin/users/${id}`);
      setUser(data.user ?? null);
    }catch(error){
      console.log(errorFunction(error));
    }
  }

  async function blockUser():Promise<void> {
    try {
      await api.get(`/admin/users/${id}/block`);
      fetchUser();
    } catch (error) {
      console.log(errorFunction(error));
    }
  }

  async function setOrder(orderStatus:string, id:string):Promise<void> {
    try {
      await api.put('/admin/users/updateStatus', {
        id,
        status: orderStatus
      });
    } catch (error) {
      console.log(errorFunction(error));
    }
    fetchUser();
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  if(!user)return <Spinner />

  return (
    <div className="bg-gray-50 min-h-screen">
      <SideBar />
      
      <main className="pl-[260px] p-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-[10px] flex justify-between items-start max-w-4xl">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {user.status}
              </span>
            </div>
            <div className="space-y-1 text-gray-500">
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">ID:</span> {user._id}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Email:</span> {user.email}
              </p>
            </div>
          </div>

          <button 
            onClick={blockUser} 
            className={`px-6 py-2.5 cursor-pointer rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md ${
              user.status === "Active" 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {user.status === "Active" ? "Block User" : "Unblock User"}
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">Order History</h2>

        <div className="flex flex-col gap-6 max-w-5xl">
          {user.orderDetails.map((v, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-gray-50 border-b border-gray-100 text-sm">
                <div>
                  <p className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Order ID</p>
                  <p className="font-mono text-gray-700">{v._id?.slice(-10)}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Date</p>
                  <p className="text-gray-700">{v.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Total Price</p>
                  <p className="text-gray-900 font-bold">${v.paymentDetails?.total}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Payment</p>
                  <p className="text-gray-700">{v.paymentDetails?.paymentType}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-[10px] font-bold tracking-wider">Current Status</p>
                  <p className="text-blue-600 font-semibold">{v.status}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6 space-y-4">
                {v.items.map((d, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <img className="w-30 h-30 object-contain px-4 rounded-md border border-gray-200" src={d.img} alt={d.name} />
                    <div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-4 items-center">
                      <div className="font-bold text-gray-800">{d.name}</div>
                      <div className="text-gray-600 text-sm">Price: <span className="font-medium">${d.price}</span></div>
                      <div className="text-gray-600 text-sm">Qty: <span className="font-medium">{d.quantity}</span></div>
                      <div className="text-xs inline-block px-2 py-1 bg-gray-100 text-gray-500 rounded self-start w-fit uppercase">{d.category}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Management Bar */}
              <div className="flex border-t border-gray-100 cursor-pointer">
                {["Placed", "Shipped", "Reached", "Delivered"].map((status) => (
                  <div
                    key={status}
                    onClick={() => setOrder(status, v._id)}
                    className={`flex-1 py-4 text-center text-sm font-bold transition-all ${
                      v.status === status 
                      ? "bg-green-600 text-white" 
                      : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {status}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!user.orderDetails.length && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
               <p className="text-gray-400">No orders found for this user.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}