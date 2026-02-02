import Header from "../components/header";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // Dummy user data
  const user = {
    name: "Anjad",
    email: "anjad@footster.com",
    mobile: "+91 98765-43210",
    memberSince: "Oct 2023"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto pt-28 md:pt-26 pb-20 px-4 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: Navigation & User Card */}
          <div className="lg:w-1/3 space-y-6">
            {/* User Greeting Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="h-16 w-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                <img className="h-8 w-8" src="/icons/profile.png" alt="Avatar" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Hello,</p>
                <h4 className="text-2xl font-black text-gray-900 leading-tight">{user.name}</h4>
              </div>
            </div>

            {/* Quick Links Menu */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-2">
                {[
                  { label: "My Orders", icon: "/icons/orders.png", path: "/orders" },
                  { label: "My Favorites", icon: "/icons/favorite.png", path: "/wishlist" },
                  { label: "My Cart", icon: "/icons/cart.png", path: "/cart" },
                  { label: "Logout Now", icon: "/icons/login.png", action: "logout", color: "text-red-500" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => item.path ? navigate(item.path) : console.log('Logout')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                  >
                    <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                      <img className="h-5 w-5 opacity-70" src={item.icon} alt="" />
                    </div>
                    <h4 className={`font-bold ${item.color || 'text-gray-700'}`}>{item.label}</h4>
                    <span className="ml-auto text-gray-300 group-hover:text-black transition-colors">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Detailed Information */}
          <div className="lg:flex-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black uppercase tracking-tight">Personal Information</h2>
                <button className="text-blue-600 font-bold text-sm hover:underline">Edit</button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      readOnly 
                      value={user.name} 
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-0 cursor-default" 
                      type="text" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mobile Number</label>
                    <input 
                      readOnly 
                      value={user.mobile} 
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-0 cursor-default" 
                      type="text" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    readOnly 
                    value={user.email} 
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 focus:ring-0 cursor-default" 
                    type="email" 
                  />
                </div>
              </div>

              {/* Account Meta */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                <div className="bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-blue-700 text-xs font-bold">FootSter Elite Member</span>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-green-700 text-xs font-bold">Verified Account</span>
                </div>
                <p className="text-gray-400 text-xs font-bold flex items-center ml-auto">
                  Member since {user.memberSince}
                </p>
              </div>
            </div>

            {/* Account Security Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Account Security</h4>
                <p className="text-gray-500 text-sm mt-1">Change password or update recovery email</p>
              </div>
              <button className="bg-gray-100 px-6 py-2 rounded-xl font-bold text-sm hover:bg-black hover:text-white transition-all">
                Update
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}