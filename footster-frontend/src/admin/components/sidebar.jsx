import '../styles/sidebar.css'
import {useNavigate} from 'react-router-dom'
import api from  '../../services/axios'

export default function SideBar (){
  const navigate = useNavigate();

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
      <div onClick={logoutAdmin} className='logout-btn'>
        <div>Logout</div>
      </div>
     </div>
    </>
  )
}