import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import api from "../services/axios";

export default function OrderSec() {
  const [orderObj, setOrderObj] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data: orderDetails } = await api.get(`/user/orders/${id}`);
        setOrderObj(orderDetails.order);
        // Clearing cart after successful order
        await api.get('/cart/clear');
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchOrder();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 md:py-20">
      
      {/* Success Animation/Image Section */}
      <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative inline-block">
          <img 
            className="h-32 w-32 md:h-40 md:w-40 object-contain mx-auto mb-4" 
            src="/order-success.png" 
            alt="order success" 
          />
          {/* Decorative pulse effect */}
          <div className="absolute inset-0 bg-green-400 rounded-full scale-110 opacity-10 animate-ping"></div>
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Order Confirmed!</h2>
        <p className="text-gray-500 mt-2 font-medium">Sit back and relax, your shoes are on the way.</p>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        
        {/* Order Details Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">Order Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-gray-500 font-medium">Order ID</span>
              <span className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">{orderObj._id}</span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-gray-500 font-medium">Status</span>
              <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-xs uppercase">Order Placed</span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-gray-500 font-medium">Date</span>
              <span className="text-gray-800 font-semibold">{orderObj.date}</span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-gray-500 font-medium">Payment Method</span>
              <span className="text-gray-800 font-semibold uppercase">{orderObj.paymentDetails?.paymentType}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">Delivery To</h3>
          <div className="space-y-1">
            <p className="font-bold text-lg text-gray-900">{orderObj.to?.name}</p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{orderObj.to?.adres}</p>
            <p className="text-gray-500 text-sm font-medium">Pincode: {orderObj.to?.pincode}</p>
          </div>
        </div>

        {/* Items Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 border-b pb-2">Purchased Items</h3>
          <div className="divide-y divide-gray-100">
            {orderObj.items?.map((v, i) => (
              <div key={i} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100">
                    <img className="max-h-full" src={v.img} alt="" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm md:text-base">{v.name}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">Qty: {v.quantity}</p>
                  </div>
                </div>
                <p className="font-black text-gray-900">₹{v.price}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
             <span className="font-black text-lg text-gray-900 uppercase">Total amount</span>
             <span className="text-2xl font-black text-orange-600">₹{orderObj.paymentDetails?.total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex-1 bg-black text-white py-4 rounded-2xl font-black hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate('/orders')} 
            className="flex-1 bg-white border-2 border-gray-200 text-gray-900 py-4 rounded-2xl font-black hover:border-black transition-all active:scale-95"
          >
            View My Orders
          </button>
        </div>

      </div>
    </div>
  )
}