import { useEffect, useState } from "react";
import Header from "../components/header";

export default function Notification() {
  // Safe parsing of localStorage
  const userObj = JSON.parse(localStorage.getItem('user')) || { noti: [] };
  const [notif, setNotif] = useState(userObj.noti || []);

  function clearNoti(index) {
    setNotif(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({
      ...userObj,
      noti: notif
    }));
  }, [notif]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto pt-18 md:pt-26 pb-10 px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
            Notifications
          </h1>
          <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
            {notif.length} New
          </span>
        </div>
        
        <div className="h-px bg-gray-200 w-full mb-8"></div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notif.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <img className="h-12 w-12 opacity-20" src="/icons/noti-empty.png" alt="Empty" />
              </div>
              <h2 className="text-xl font-medium text-gray-400 italic">
                All caught up! No new notifications.
              </h2>
            </div>
          ) : (
            notif.map((v, i) => (
              <div 
                key={i}
                onClick={() => clearNoti(i)} 
                className="group relative bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:border-black transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-black transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base mt-1 leading-relaxed">
                      {v.dis}
                    </p>
                  </div>
                  
                  <div className="shrink-0 text-right">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-red-500 transition-colors">
                      Dismiss
                    </h4>
                  </div>
                </div>
                
                {/* Visual Indicator for Mobile */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-yellow-400 rounded-r-full opacity-100"></div>
              </div>
            ))
          )}
        </div>

        {notif.length > 0 && (
          <button 
            onClick={() => setNotif([])}
            className="w-full mt-10 py-3 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear all notifications
          </button>
        )}
      </main>
    </div>
  );
}