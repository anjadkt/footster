import '../styles/sidebar.css'
import {useNavigate} from 'react-router-dom'

export default function SideBar (){
  const navigate = useNavigate()
  return(
    <>
     <div className="side-bar-container-div">
      <div>
        <div className='admin-panel-title'>
          <h1>Footster Admin</h1>
        </div>
        <div className='menu'>
          MENU
        </div>
        <div className='admin-option-container'>
          <div onClick={()=>navigate('/dashboard')}>
            <img src="/icons/dashboard.png" alt="" />
            Dashboard
          </div>
          <div onClick={()=>navigate('/allProducts')}>
            <img src="/icons/products.png" alt="" />
            Products 
          </div>
          <div onClick={()=>navigate('/users')}>
            <img src="/icons/users.png" alt="" />
            Users 
          </div>
          <div onClick={()=>navigate('/adminOrders')}>
            <img src="/icons/orders.png" alt="" />
            Orders
          </div>
        </div>
      </div>
      <div onClick={()=> {
        localStorage.clear();
        navigate('/login');
      }} className='logout-btn'>
        <div>Logout</div>
      </div>
     </div>
    </>
  )
}