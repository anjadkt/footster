import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from '../services/axios';
import { useState } from "react";

export default function CartItem({ data, setCart }) {
  const [qnt, setQnt] = useState(data.quantity);
  const navigate = useNavigate();

  async function incOrDec(action) {
    try {
      const { data: productObj } = await api.post(`/cart/${action}`, {
        "id": data.product._id
      });
      setQnt(productObj.quantity);
      setCart();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removeProduct() {
    try {
      await api.put('/cart', { "id": data.product._id });
      setCart();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-xl mb-4 shadow-sm">
      {/* Delivery Status */}
      <h3 className="text-green-700 font-bold text-base md:text-lg mb-4">
        Delivery date: Tuesday, June 21
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        
        {/* Product Image */}
        <div 
          onClick={() => navigate(`/product/${data.product._id}`)} 
          className="w-2xs sm:w-32 md:w-44 aspect-square sm:h-auto bg-gray-100 rounded-lg flex items-center justify-center p-4 cursor-pointer hover:bg-gray-200 transition-colors shrink-0 overflow-hidden"
        >
          <img className="h-full w-full object-contain" src={data.product.img} alt={data.product.name} />
        </div>

        {/* Product Info & Actions */}
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-lg font-bold text-gray-900 truncate">{data.product.name}</p>
          <h4 className="text-[#e1711d] font-bold text-lg mt-1">₹{data.product.price}</h4>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center border border-black rounded overflow-hidden h-8">
              <button 
                onClick={() => incOrDec("dec")} 
                className="px-3 bg-white hover:bg-gray-100 border-r border-black font-bold active:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 font-bold text-sm">{qnt}</span>
              <button 
                onClick={() => incOrDec("inc")} 
                className="px-3 bg-white hover:bg-gray-100 border-l border-black font-bold active:bg-gray-200"
              >
                +
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="text-xs font-bold text-gray-500 hover:text-black underline px-2 py-1">Save</button>
              <button 
                onClick={() => {
                  toast.warning("Item removed");
                  removeProduct();
                }}
                className="text-xs font-bold text-red-500 hover:text-red-700 underline px-2 py-1"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Delivery Options - Full width on mobile, right-aligned on desktop */}
        <div className="w-full md:w-64 pt-4 mt-4 sm:mt-0 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:pl-6 border-gray-100">
          <p className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">Delivery options:</p>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input name={`del-${data.product._id}`} type="radio" defaultChecked className="mt-1 w-4 h-4 accent-green-700" />
              <div className="text-sm">
                <p className="font-bold text-green-700 group-hover:underline">Tuesday, June 21</p>
                <p className="text-gray-500 text-xs">FREE Shipping</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input name={`del-${data.product._id}`} type="radio" className="mt-1 w-4 h-4 accent-green-700" />
              <div className="text-sm">
                <p className="font-bold text-green-700 group-hover:underline">Monday, June 17</p>
                <p className="text-gray-500 text-xs">₹189 - Shipping</p>
              </div>
            </label>
          </div>
        </div>
      </div>
      
      <ToastContainer autoClose={1000} position="bottom-right" hideProgressBar />
    </div>
  );
}