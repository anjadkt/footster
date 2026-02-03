import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/axios'
import {useDispatch} from 'react-redux'
import {setItemToCart} from '../app/features/user/userSlice.js'

export default function OrderSummary() {
  const [cart, setCart] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [price, setPrice] = useState({ items: 0, handle: 0, tax: 0, platform: 0, discount: 0, total: 0 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Elems = useRef({
    name: null, number: null, pincode: null, city: null,
    adres: null, state: null, country: null, method: null,
  })

  useEffect(() => {
    async function fetchCart() {
      try {
        const { data: cartObj } = await api.get("/cart");
        setCart(cartObj.cart);
        const { data } = await api.get("/address");
        if (data.address.name) {
          Object.keys(data.address).forEach(key => {
            if (Elems.current[key]) Elems.current[key].value = data.address[key];
          });
        }
      } catch (error) { console.log(error.message); }
    }
    fetchCart();
  }, []);

  useEffect(() => {
    let items = 0;
    cart.forEach(v => { items += v.product.price * v.quantity; });
    const tax = Math.round(items * 0.1), handle = 27, platform = cart.length * 2;
    const rawTotal = items + tax + handle + platform;
    const total = Math.round(rawTotal / 100) * 100;
    const discount = total - rawTotal;
    setPrice({ items, tax, handle, platform, discount, total });
  }, [cart]);

  const setAdress = async (e) => {
    e.preventDefault();
    try {
      const addrObj = Object.fromEntries(Object.entries(Elems.current).map(([k, v]) => [k, k === 'number' || k === 'pincode' ? Number(v.value) : v.value]));
      await api.post('/address', addrObj);
    } catch (error) { console.log(error.message); }
  }

  const setOrder = async () => {
    const orderObj = {
      paymentDetails: { paymentType: Elems.current.method.value, total: price.total },
      items: cart.map(v => ({ ...v.product, quantity: v.quantity })),
      to: Object.fromEntries(Object.entries(Elems.current).map(([k, v]) => [k, k === 'number' || k === 'pincode' ? Number(v.value) : v.value]))
    };
    try {
      const { data } = await api.post("/user/orders", orderObj);
      dispatch(setItemToCart([]));
      navigate(`/confirm/${data.orderId}`);
    } catch (error) { console.log(error.message); }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 px-4 md:px-12 py-4 flex items-center justify-between gap-4">
        <Link className="text-2xl font-black" to='/cart'>FootSter.<span className="text-yellow-500">cart</span></Link>
        <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Order Summary</h2>
        <div className="relative hidden md:block w-full md:w-64">
          <input className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black" type="text" placeholder="Search..." />
          <img className="absolute right-3 top-2.5 h-4 opacity-40" src="./icons/search.png" alt="" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Products and Address */}
        <div className="flex-1 space-y-8">
          {/* Products List */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-4">Items in your cart</h3>
            {cart.map((v, i) => (
              <div key={i} className="flex gap-4 border-b last:border-0 pb-4 last:pb-0">
                <img className="h-20 w-20 object-contain bg-gray-50 rounded-lg" src={v.product.img} alt="" />
                <div className="flex-1 text-sm space-y-1">
                  <p className="font-bold text-gray-800">{v.product.name || 'Product Name'}</p>
                  <p className="text-gray-500">Category: {v.product.category}</p>
                  <div className="flex justify-between font-bold mt-2">
                    <span>Qty: {v.quantity}</span>
                    <span className="text-orange-600">₹{v.product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Address Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-black mb-6">Delivery Address</h2>
            <form onSubmit={(e) => { setAdress(e); setConfirm(true); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input ref={e => Elems.current.name = e} className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none" required type="text" placeholder="Full Name" />
                <input ref={e => Elems.current.number = e} className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none" required type="number" placeholder="Phone Number" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input ref={e => Elems.current.pincode = e} className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none" required type="number" placeholder="Pincode" />
                <input ref={e => Elems.current.city = e} className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none" required type="text" placeholder="City/District" />
              </div>
              <textarea ref={e => Elems.current.adres = e} className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none h-24" required placeholder="Address (Area and Street)"></textarea>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input ref={e => Elems.current.state = e} className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none" required type="text" placeholder="State" />
                <input ref={e => Elems.current.country = e} className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none" required type="text" placeholder="Country" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="w-full p-3 border rounded-xl focus:ring-1 focus:ring-black outline-none" type="text" placeholder="Landmark (Optional)" />
                <select ref={e => Elems.current.method = e} className="w-full p-3 border rounded-xl bg-gray-50 font-bold outline-none cursor-pointer">
                  <option>COD</option><option>UPI</option><option>CREDIT CARD</option><option>DEBIT CARD</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-black hover:bg-gray-800 transition-colors mt-4">
                SAVE & DELIVER HERE
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Price Details (Sticky on Desktop) */}
        <div className="lg:w-80 h-fit lg:sticky lg:top-32">
          <div className="bg-white p-6 rounded-2xl border shadow-md space-y-4">
            <h3 className="font-black text-gray-400 uppercase text-xs tracking-widest border-b pb-2">Price Details</h3>
            <div className="space-y-3 text-sm font-medium text-gray-600">
              <div className="flex justify-between"><span>Items ({cart.length})</span><span>₹{price.items}</span></div>
              <div className="flex justify-between"><span>Tax (10%)</span><span>₹{price.tax}</span></div>
              <div className="flex justify-between"><span>Handling</span><span>₹{price.handle}</span></div>
              <div className="flex justify-between"><span>Platform fee</span><span>₹{price.platform}</span></div>
              <div className="flex justify-between text-green-600 font-bold"><span>Discount</span><span>-₹{Math.abs(price.discount)}</span></div>
            </div>
            <div className="border-t pt-4 flex justify-between items-center text-lg font-black text-gray-900">
              <h4>Total Payable</h4>
              <h4 className="text-orange-600">₹{price.total}</h4>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black mb-4">Confirm Order</h2>
            <img className="h-40 mx-auto mb-6" src="./confirm-order.png" alt="" />
            <p className="text-gray-500 font-medium mb-8">Please review your details <br/> before confirming.</p>
            <div className="flex gap-4">
              <button onClick={() => setConfirm(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50">Cancel</button>
              <button onClick={setOrder} className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}