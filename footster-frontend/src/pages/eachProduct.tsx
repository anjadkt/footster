import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/header";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/axios";

export default function EachProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function takeProduct() {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);

        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.favorite) {
          const favProduct = user.favorite.find(d => d.id === data.id);
          setFav(!!favProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    takeProduct();
  }, [id]);

  function setFavorite() {
    const updatedUser = JSON.parse(localStorage.getItem('user')) || {};
    if (!updatedUser.login) {
      navigate('/login');
      return;
    }
    let favorite = updatedUser.favorite || [];

    if (!fav) {
      favorite.push({ ...product, isFav: true });
    } else {
      favorite = favorite.filter(d => d.id !== product.id);
    }
    localStorage.setItem('user', JSON.stringify({ ...updatedUser, favorite }));
    setFav(!fav);
  }

  function addToCart() {
    const updatedUser = JSON.parse(localStorage.getItem('user')) || {};
    if (!updatedUser.login) {
      navigate('/login');
      return;
    }

    const cart = updatedUser.cart || [];
    const exist = cart.find(eproduct => eproduct.id === product.id);

    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    toast.success("Added to Cart");
    localStorage.setItem('user', JSON.stringify({ ...updatedUser, cart }));
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2]/60">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 mt-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          
          {/* Left: Image Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="relative aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-12 border border-gray-50">
              <img 
                className="max-h-full object-contain hover:scale-105 transition-transform duration-500" 
                src={product.img} 
                alt={product.name} 
              />
              <button 
                onClick={setFavorite}
                className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all active:scale-90"
              >
                <img className="h-6 w-6" src={fav ? "/icons/favorite.png" : "/icons/favorite3.png"} alt="favorite" />
              </button>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={addToCart} 
                className="flex-1 py-4 border-2 border-gray-900 font-bold text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all active:scale-95"
              >
                Add to cart
              </button>
              <button 
                onClick={() => { addToCart(); navigate('/cart'); }} 
                className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                Buy it Now
              </button>
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                Step into all-day comfort with these lightweight sneakers. Designed with breathable mesh and a cushioned sole, they keep your feet fresh while giving your outfit a modern, laid-back edge.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-black text-gray-900">
                ₹{product.price}<span className="text-xl font-normal text-gray-400">/-</span>
              </h1>
              <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
              <img className="h-6" src={`/ratings/rating-${product.rating}.png`} alt="rating" />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Available Colors: <span className="text-gray-900">{product.color}</span>
              </div>
              
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Post a review about this product"
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-gray-900 transition-all text-gray-700"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 hover:text-black">
                  POST
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Customer Reviews 
            <span className="text-sm font-normal text-gray-400 font-sans">(0)</span>
          </h2>
          <div className="py-10 border-t border-gray-50 flex flex-col items-center justify-center text-gray-300">
             <img src="/icons/review-icon.png" className="h-12 opacity-20 mb-2 grayscale" alt="" />
             <p className="italic">No reviews yet. Be the first to share your thoughts!</p>
          </div>
        </div>
      </main>

      <ToastContainer autoClose={1000} position="bottom-right" />
    </div>
  )
}