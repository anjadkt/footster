import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import '../styles/users.css'
import { useNavigate } from "react-router-dom";
import api from '../../services/axios'


export default function Users (){
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  async function  fetchData() {
    try{
      const {data} = await api.get('/admin/users/all');
      setUsers(data.users);
    }catch(error){
      console.log(error.message);
    }
  }

  function searchUser(s){
    if(!s)return fetchData();
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
              <div onClick={()=>navigate(`/users/${v._id}`)} className="user-info" key={i}>
                <p>ID : {v._id}</p>
                <p>Role : {v.role}</p>
                <h3>{v.name}</h3> 
                <p>{v.email}</p>
                <p>status : <span style={{backgroundColor : v.status == "Active"? "#78eda5ff":"red"}}>{v.status}</span></p>
              </div>
            ))
          }
        </div>
     </div>
    </>
  )
}