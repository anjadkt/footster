import { useEffect, useState } from "react";
import Header from "../components/header";
import '../styles/noti.css'

export default function Notification(){
  const userObj = JSON.parse(localStorage.getItem('user'));
  const [notif,setNotif] = useState(userObj.noti);
  function clearNoti(i){
    setNotif(pre=>{
      const notifications = [...pre]
      return notifications.toSpliced(i,1);
    });
  }
  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(
      {
      ...userObj,
      noti : notif
      }
    ))
  },[notif]);

  return (
    <>
     <Header />
     <div className="noti-container-div">
      <h1>Notifications</h1>
      <hr />
      <div className="all-noti-container-div">
        {
          notif.length == 0 ? (
            <h1 className="no-noti"> No notifications</h1>
          ) : (
            notif && notif.map((v,i)=>(
              <div onClick={()=>clearNoti(i)} key={i} className="each-notification">
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.dis}</p>
                </div>
                <h4>Click to close</h4>
              </div>
            ))
          )
        }
      </div>
     </div>
    </>
  )
}