
import { useNavigate} from 'react-router-dom'
import axios from 'axios';

export default function Dropdown(){

  return (
    <>
     <div className="drop-down-div">
      <div>Casuals</div>
      <div>Sports</div>
      <div>Heavy-duty</div>
      <div>Traditional</div>
      <div>Indoor</div>
     </div>
    </>
  )
}

export function UserDrop(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  async function postJson(){
    const userObj = JSON.parse(localStorage.getItem('user'));
    const {data}  = await axios.get(` https://footster-app.onrender.com/users?id=${userObj.id}`);
    const updateUser = {...userObj,email : data[0].email,password : data[0].password,login : false}
    axios.put(`https://footster-app.onrender.com/users/${userObj.id}`,updateUser);
    localStorage.clear();
    navigate('/');
  }
  return(
    <>
     <div className="user-drop-div">
       <div onClick={()=> navigate('/profile')}>
        <img  src="/icons/profile.png" alt="profile" />
        My Profile
        </div>
       <div onClick={()=>navigate('/orders')}>
        <img  src="/icons/orders.png" alt="orders" />
        Orders
        </div>
       <div onClick={()=>navigate('/wishlist')}>
        <img  src="/icons/favorite.png" alt="" />
        Wishlist
        </div>
       <div className='noti-cover-div' onClick={()=>navigate('/notifications')}>
        <div className='noti-count'>{user.noti.length}</div>
        <img  src="/icons/notification.png" alt="" />
        Notifications
        </div>
       <div onClick={postJson}>
        <img  src="/icons/login.png" alt="" />
        Logout
        </div>
     </div>
    </>
  )
}