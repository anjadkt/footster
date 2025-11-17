import axios from "axios";
import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import '../styles/users.css'
import { useNavigate } from "react-router-dom";


export default function Users (){
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  async function  fetchData() {
    const {data} = await axios.get('https://footster-app.onrender.com/users');
    data.shift();
    setUsers(data);
  }

  function searchUser(s){
    const search = s.toLowerCase();
    const searched = users.filter((v)=> v.name.toLowerCase().includes(search));
    setUsers(searched);
  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
     <SideBar/>
     <div className="users-admin-container-div">
        <div className="header-admin-panel">
          <h1>Manage Users</h1>
          <input onChange={e => searchUser(e.target.value)} type="text" placeholder="Search Users"/>
        </div>
        <hr />
        <div className="alluser-admin-container-div">
          {
            users && users.map((v,i)=>(
              <div onClick={()=>navigate(`/users/${v.id}`)} className="user-info" key={i}>
                <p>ID : {v.id}</p>
                <p>Role : {v.role}</p>
                <h3>{v.name}</h3> 
                <p>{v.email}</p>
                <p>status : <span style={{backgroundColor : v.status == "active"? "#78eda5ff":"red"}}>{v.status}</span></p>
              </div>
            ))
          }
        </div>
     </div>
    </>
  )
}