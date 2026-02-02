import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/axios'

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const { data } = await api.get('/admin/users/all');
      setUsers(data.users);
    } catch (error) {
      console.log(error.message);
    }
  }

  function searchUser(s) {
    if (!s) return fetchData();
    const search = s.toLowerCase();
    const searched = users.filter((v) => v.name.toLowerCase().includes(search));
    setUsers(searched);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <SideBar />
      {/* Main Container: Space for sidebar, light gray background */}
      <div className="ml-[260px] p-8 min-h-screen bg-gray-50 font-sans text-gray-900">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <input 
            onChange={e => searchUser(e.target.value)} 
            type="text" 
            placeholder="Search Users"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <hr className="border-t-2 border-gray-200 mb-8" />

        {/* User Card Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {
            users && users.map((v, i) => (
              <div 
                onClick={() => navigate(`/users/${v._id}`)} 
                key={i}
                className="bg-white rounded-[14px] p-6 shadow-md cursor-pointer transition-all duration-250 ease-in-out hover:-translate-y-1.5 hover:shadow-xl hover:bg-[#fdfdfd] flex flex-col gap-2"
              >
                <p className="text-sm text-gray-600">ID: {v._id}</p>
                <p className="text-sm text-gray-600 capitalize">Role: {v.role}</p>
                <h3 className="text-xl font-semibold text-gray-900 my-1">{v.name}</h3>
                <p className="text-sm text-gray-700 mb-2">{v.email}</p>
                
                <p className="text-sm text-gray-700">
                  Status: 
                  <span className={`ml-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase
                    ${v.status === "Active" 
                      ? "bg-[#78eda5] text-white" 
                      : "bg-red-500 text-white"
                    }`}
                  >
                    {v.status}
                  </span>
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}