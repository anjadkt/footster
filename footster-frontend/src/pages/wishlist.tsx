import { useState, useEffect } from "react";
import Header from "../components/header";
import Product from "../components/product";
import api from "../services/axios";

export default function Wishlist() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    async function fetchFav() {
      try {
        const { data } = await api.get('/wishlist');
        setFavorite(data.favorite);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchFav();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto pt-18 md:pt-24 pb-20 px-4 md:px-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
              Wishlist
            </h1>
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full mt-1">
              {favorite?.length || 0} Items
            </span>
          </div>
          <p className="text-gray-500 text-sm md:text-base italic">
            Your personal collection of must-have styles.
          </p>
          <div className="h-px bg-gray-100 w-full mt-6"></div>
        </div>

        {/* Product Grid */}
        <div className="all-div">
          {favorite?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
              {favorite.map((v, i) => (
                <div key={v._id || i} className="w-full max-w-[290px] animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <Product data={v} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="bg-gray-50 p-8 rounded-full mb-6">
                <img 
                  className="h-20 w-20 opacity-20 grayscale" 
                  src="/icons/favorite.png" 
                  alt="Empty Wishlist" 
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-400 italic mb-4">
                Your wishlist is empty!
              </h2>
              <p className="text-gray-500 mb-8 max-w-xs">
                Browse our collection and save your favorites here.
              </p>
              <button 
                onClick={() => window.location.href = '/products'}
                className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                Go Shopping
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}