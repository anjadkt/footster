import { Link, useNavigate } from 'react-router-dom';
import Dropdown, { UserDrop } from './dropdown';
import { useState } from 'react';
import Product from './product';
import api from '../services/axios';
import {useSelector} from 'react-redux'

export default function Header() {
  const [drop, setDrop] = useState(false);
  const [userdrop, setUserdrop] = useState(false);
  const [search, setSearch] = useState(false);
  const [products, setProducts] = useState([]);
  
  const {cart,name,login} = useSelector(state => state.user);
  
  const navigate = useNavigate();

  async function listProducts(txt) {
    const text = txt.value.toLowerCase();
    if (!text) { setProducts([]); return; }
    const { data } = await api.get('/products');
    setProducts(data.filter(v => v.name.toLowerCase().includes(text)));
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black shadow-md px-4 md:px-12 py-3 flex items-center justify-between gap-4">
      
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link className="text-2xl font-black tracking-tighter" to='/'>FootSter.</Link>
        {/* Mobile Toggle Icons could go here */}
      </div>

      {/* Navigation Links - Hidden on very small screens or scrollable */}
      <nav className="hidden md:flex md:items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar w-full md:w-auto justify-center">
        <Link className="text-gray-600 font-medium hover:text-black whitespace-nowrap" to='/'>Home</Link>
        <Link className="text-gray-600 font-medium hover:text-black whitespace-nowrap" to='/products'>Products</Link>
        <div 
          className="relative flex items-center gap-1 cursor-pointer text-gray-600 font-medium hover:text-black whitespace-nowrap"
          onClick={() => { setDrop(!drop); navigate('/products'); }}
        >
          Category
          <img 
            style={{ transform: drop ? "rotate(-180deg)" : "rotate(0deg)" }} 
            className="h-3 transition-transform duration-300" src="/icons/downarrow.png" alt="" 
          />
          {drop && <div className="absolute top-full left-0 mt-2"><Dropdown /></div>}
        </div>
        <Link to='/blogs' className="text-gray-600 font-medium hover:text-black whitespace-nowrap">Blogs</Link>
      </nav>

      {/* Buttons & Search */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-center">

        <div className="relative hidden md:block">
          <input 
            onChange={e => { setSearch(true); listProducts(e.target); }} 
            className="w-full md:w-48 pl-4 pr-10 py-1.5 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black" 
            type="text" placeholder='Search...' 
          />
          <img className="absolute right-3 top-2 h-5 opacity-50" src="/icons/search.png" alt="search" />
          {search && (
            <button onClick={() => setSearch(false)} className="absolute -right-8 top-1.5 text-red-500 font-bold">X</button>
          )}
        </div>

        <div className="relative cursor-pointer shrink-0" onClick={() => navigate(login ? '/cart' : '/login')}>
          <img className="h-9 p-1.5 bg-gray-100 rounded-full hover:bg-gray-200" src="/icons/cart.png" alt="cart" />
          <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {cart?.length || 0}
          </div>
        </div>

        <div className="relative flex items-center gap-2 cursor-pointer border border-black px-3 py-1.5 rounded-md hover:bg-gray-50 shrink-0" 
             onClick={() => login ? setUserdrop(!userdrop) : navigate('/login')}>
          <img className="h-5" src="/icons/user.png" alt="user" />
          <p className="text-sm font-semibold sm:block">{login ? name : "Login"}</p>
          {userdrop && <div className="absolute top-full right-0 mt-1"><UserDrop /></div>}
        </div>
      </div>

      {/* Search Overlay Results */}
      {search && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-2xl max-h-[70vh] overflow-y-auto p-4 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((v, i) => <Product key={i} data={v} />)
          ) : (
            <h3 className="text-gray-400 col-span-full text-center py-10">No products found for your search.</h3>
          )}
        </div>
      )}
    </header>
  );
}