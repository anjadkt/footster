import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import api from '../services/axios';

export default function Product({ data }) {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();
  const selectRef = useRef();

  useEffect(() => {
    async function fetchFav() {
      try {
        const { data: favoriteData } = await api.get('/wishlist/favorite');
        setFav(favoriteData.favorite.includes(data._id));
      } catch (error) {}
    }
    if (data) fetchFav();
  }, [data]);

  async function addToCart() {
    try {
      const { data: userObj } = await api.get('/user/details');
      if (!userObj[0].login) return navigate('/login');

      await api.post(`/cart`, { id: data._id, quantity: Number(selectRef.current.value) || 1 });
      toast.success("Added to Cart");
    } catch (error) {
      if (error.response?.status === 401) navigate('/login');
    }
  }

  async function toggleFavorite() {
    try {
      const { data: userObj } = await api.get('/user/details');
      if (!userObj[0].login) return navigate('/login');

      const { data: res } = await api.post('/wishlist', { id: data._id });
      setFav(!fav);
      toast.info(res.favorite ? "Added to Wishlist" : "Removed from Wishlist");
    } catch (error) {
      if (error.response?.status === 401) navigate('/login');
    }
  }

  if (!data) return <h3 className="text-gray-400 p-10 text-center w-full">No product Found</h3>;

  return (
    <div className="bg-white h-[350px] border border-black rounded-[20px] p-4 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl w-full">
      {/* Header: Name & Fav */}
      <div className="flex justify-between items-start w-full mb-2">
        <div>
          <h4 className="font-bold text-gray-800 text-lg leading-tight">
            {data.name.length > 18 ? data.name.slice(0, 15) + "..." : data.name}
          </h4>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{data.category}</p>
        </div>
        <button onClick={toggleFavorite} className="shrink-0 active:scale-90 transition-transform">
          <img className="h-7 w-7" src={fav ? "/icons/favorite.png" : "/icons/favorite3.png"} alt="favorite" />
        </button>
      </div>

      {/* Image Section */}
      <div onClick={() => navigate(`/product/${data._id}`)} 
           className="w-full aspect-square bg-gray-50 rounded-[100px] flex items-center justify-center p-6 mb-4 cursor-pointer overflow-hidden">
        <img className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" src={data.img} alt={data.name} />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 w-full mb-3 px-2">
        <img className="h-4" src={`./ratings/rating-${data.rating}.png`} alt="rating" />
        <p className="text-sm font-bold text-gray-500">{(data.rating / 10).toFixed(1)}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2 w-full mb-4 px-2 text-sm font-medium">
        <span>Qty:</span>
        <select ref={selectRef} className="border border-gray-300 rounded px-1 py-0.5 focus:border-black outline-none cursor-pointer">
          {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
        </select>
      </div>

      {/* Footer: Price & Add */}
      <div className="flex justify-between items-center w-full mt-auto">
        <button onClick={addToCart} className="bg-[#E8D62E] border border-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-white transition-colors active:scale-95">
          Add to Cart
        </button>
        <p className="font-black text-[#E1711D] text-lg">
          <span className="text-xl">₹</span>{data.price}
        </p>
      </div>
      <ToastContainer autoClose={1000} position="bottom-right" />
    </div>
  );
}