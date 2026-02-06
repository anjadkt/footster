import { useNavigate } from 'react-router-dom'
import api from '../services/axios'
import { useDispatch } from 'react-redux';
import { setUserLogout } from '../app/features/user/userSlice';
import errorFunction from '../utils/errorFunction';
import type { AppDispatch } from '../app/store/store';


export default function Dropdown() {
  const navigate = useNavigate();
  const categories = ["Casuals", "Sports", "Heavy-duty", "Traditional", "Indoor"];

  return (
    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="py-2">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => navigate(`/products?category=${cat.toLowerCase()}`)}
            className="px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors border-l-4 border-transparent hover:border-black"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  )
}



export function UserDrop() {
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();

  async function logoutUser():Promise<void> {
    try {
      const { data } = await api.get('/user/logout');
      dispatch(setUserLogout())
      navigate('/');
    } catch (error) {
      console.log(errorFunction(error));
    }
  }

  const menuItems = [
    { label: 'My Profile', icon: '/icons/profile.png', path: '/profile' },
    { label: 'Orders', icon: '/icons/orders.png', path: '/orders' },
    { label: 'Wishlist', icon: '/icons/favorite.png', path: '/wishlist' },
    { label: 'Notifications', icon: '/icons/notification.png', path: '/notifications', count: 0 },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="p-3 space-y-1">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-white transition-colors">
                <img className="h-5 w-5 object-contain" src={item.icon} alt={item.label} />
              </div>
              <span className="font-bold text-gray-700 group-hover:text-black">{item.label}</span>
            </div>
            
            {item.label === 'Notifications' && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {item.count}
              </span>
            )}
          </div>
        ))}

        <div className="border-t border-gray-100 mt-2 pt-2">
          <div
            onClick={logoutUser}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 text-red-500 cursor-pointer transition-all"
          >
            <div className="p-2 bg-red-100 rounded-xl">
              <img className="h-5 w-5 object-contain" src="/icons/login.png" alt="logout" />
            </div>
            <span className="font-black text-sm uppercase tracking-wider">Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}