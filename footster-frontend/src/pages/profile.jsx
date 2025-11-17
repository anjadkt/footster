import Header from "../components/header";
import '../styles/profile.css'

export default function Profile (){
  return(
    <>
     <Header />
     <div className="main-profile-container">
      <div className="profile-buttons-container">
        <div className="profile-name-div">
          <div>
            <img src="/icons/profile.png" alt="" />
          </div>
          <div>
            <div>Hello,</div>
            <h4>Anjad</h4>
          </div>
        </div>
        <div className="profile-buttons">
          <div>
            <div><img src="/icons/orders.png" alt="" /></div>
            <h4>My Orders</h4>
          </div>
          <div>
            <div><img src="/icons/favorite3.png" alt="" /></div>
            <h4>My Favorites</h4>
          </div>
          <div>
            <div><img src="/icons/cart.png" alt="" /></div>
            <h4>My Cart</h4>
          </div>
          <div>
            <div><img src="/icons/login.png" alt="" /></div>
            <h4>Logout Now</h4>
          </div>
        </div>
      </div>
      <div className="profile-info-container">
        <h4>Personal Information</h4>
        <div><input value={"name"} type="text" /></div>
        <h4>Email Address</h4>
        <div><input value={"eamil"} type="text" /></div>
        <h4>Mobile Number</h4>
        <div><input value={"Mobile"} type="text" /></div>
      </div>
     </div>
    </>
  )
}