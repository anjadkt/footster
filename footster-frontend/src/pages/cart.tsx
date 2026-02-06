import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/cartItems'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store/store';
import Spinner from '../components/spinner';

type PriceCal = {
  items: number;
  shipping: number;
  beforTax: number;
  tax: number;
  total: number
}

export default function Cart() {
  const {cart , name , loading} = useSelector((state:RootState) => state.user);
  const [price, setTotal] = useState<PriceCal>({ items: 0, shipping: 0, beforTax: 0 , tax: 0, total: 0 });
  const navigate = useNavigate();

  function calcPrice() {
    const priceObj = { items: 0, shipping: 0, beforTax: 0, tax: 0, total: 0 }
    cart.forEach(v => {
      priceObj.items += v.product.price * v.quantity;
    });
    priceObj.beforTax = priceObj.shipping + priceObj.items;
    priceObj.tax = Math.round(priceObj.items * 0.1);
    priceObj.total = priceObj.beforTax + priceObj.tax;
    setTotal(priceObj);
  }

  useEffect(()=>{
    calcPrice();
  },[cart]);

  if(loading)return <Spinner/>

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="fixed top-0 left-0 right-0 h-auto min-h-[50px] bg-white border-b border-gray-200 z-50 flex items-center justify-between px-2 py-2 md:py-4 md:px-10 shadow-sm gap-4">
        <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">
          FootSter.
        </Link>
        
        <div className="text-gray-500 font-medium text-center md:text-left">
          <h2 className="text-sm md:text-lg leading-tight">
            {name}'s Cart (<span className="text-[#e1711d] font-semibold">{cart.length} Items</span>)
          </h2>
        </div>

        <div className="relative hidden md:block w-full md:w-auto max-w-sm">
          <input 
            className="w-full md:w-[250px] py-2 pl-4 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-100 focus:border-black transition-all" 
            type="text" 
            placeholder="Search products..." 
          />
          <img className="absolute right-3 top-2.5 h-5 opacity-40" src="./icons/search.png" alt="search" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1300px] mx-auto pt-20 md:pt-22 pb-20 px-4 md:px-10">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">Review your Order</h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="w-full lg:flex-1">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 gap-4">
                <h2 className="text-xl md:text-3xl font-medium text-gray-300 italic">Your cart is empty</h2>
                <button onClick={() => navigate('/')} className="text-[#e1711d] font-bold hover:underline">Continue Shopping</button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((v, i) => (
                  <CartItem key={v.product._id || i} data={v} />
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[380px] lg:sticky lg:top-28 bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-6 border-b pb-4">Order Summary</h3>
            
            <div className="space-y-4 text-sm font-medium text-gray-600">
              <div className="flex justify-between">
                <span>Items ({cart.length}):</span>
                <span className="text-gray-900 font-bold">₹{price.items}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-gray-900 font-bold">₹{price.shipping}</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span>Total before tax:</span>
                <span className="text-gray-900 font-bold">₹{price.beforTax}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax (10%):</span>
                <span className="text-gray-900 font-bold">₹{price.tax}</span>
              </div>
            </div>

            <div className="flex justify-between items-center my-6 py-4 border-t border-b">
              <h4 className="text-lg font-extrabold text-[#b12704]">Order total:</h4>
              <h4 className="text-xl font-extrabold text-[#b12704]">₹{price.total}</h4>
            </div>

            <button 
              onClick={() => cart.length === 0 ? navigate('/') : navigate('/orderSummary')}
              className="w-full py-4 bg-[#efd700] hover:bg-[#f7e017] border border-black rounded-lg font-bold text-gray-900 shadow-sm active:scale-[0.98] transition-all"
            >
              Place your Order
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}