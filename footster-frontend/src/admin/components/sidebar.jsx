import {useNavigate , NavLink} from 'react-router-dom'
import api from  '../../services/axios'

export default function SideBar (){
  const navigate = useNavigate();

  const navLinks = [
    {to:"/dashboard",name : "Dashboard" , img : "/icons/dashboard.png"},
    {to:"/allProducts",name : "Products" , img : "/icons/products.png"},
    {to:"/users",name : "Users" , img : "/icons/users.png"},
    {to:"/adminOrders",name : "Orders" , img : "/icons/orders.png"}
  ]

  async function logoutAdmin() {
    try {
      const {data}= await api.get('/admin/logout');
      if(data.status === 200)navigate('/login')
    } catch (error) {
      console.log(error.message);
    }
  }
  return(
    <>
     <div className="fixed left-0 top-0 bottom-0 w-[240px] bg-[#f4f4f4] text-[#f9fafb] px-5 py-3 flex flex-col justify-between z-50 shadow-2xl">

      <div>

        <div className='text-center'>
          <h1 className='text-2xl text-black font-bold tracking-wide pb-4'>Footster Admin</h1>
        </div>

        <div className='text-sm font-semibold tracking-wide text-[#1e1e1c] pl-1 pb-2'>
          MENU
        </div>

        <div className='flex flex-col gap-2'>

         {
          navLinks.map((v,i)=>(
            <NavLink to={v.to} className={({isActive})=>` rounded-xl flex items-center gap-3 border border-gray-500 shadow-sm px-3 py-3 text-sm cursor-pointer  transition-all ease-in-out  hover:text-[#facc15] hover:translate-x-2 ${isActive ? "bg-[#1f2937] text-[#facc15] translate-x-2" : "text-[#1e1e1c] hover:bg-[#1f2937] "}`}>
              <div><img className='w-5 h-5 object-contain' src={v.img} alt="img" /></div>
              <div className='font-semibold text-sm'>{v.name}</div>
            </NavLink>
          ))
         }

        </div>

      </div>

      <div onClick={logoutAdmin} className='p-2 text-center rounded-sm bg-[#dc2626] text-[#fffff] font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#b91c1c] scale-[1.05]'>
        <div>Logout</div>
      </div>

     </div>
    </>
  )
}