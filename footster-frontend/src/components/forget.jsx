import '../styles/login.css'

import { useError } from "../customHooks/customHooks"
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import{toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export default function Forgot(){
  const [error,setError] = useError();
  const [userObj,setUserObj] = useState({});
  const inputElem = useRef({
      old : null,
      newPass : null
    });
  const navigate = useNavigate();

  function changePass(e){
    e.preventDefault()
    let isError = true;
    for(let key in error){
      if(error[key]){
        isError = false ;
        break;
      }
    }
    if(isError){
      axios.put(`https://footster-app.onrender.com/users/${userObj.id}`,{...userObj,password : inputElem.current.newPass.value});
      sessionStorage.clear();
      toast.success("password changed")
      navigate('/login')
    }else{
      console.log(error)
    }
  }
  
  useEffect(()=>{
    setUserObj(JSON.parse(sessionStorage.getItem('user')));
  },[])
  return (
    <>
    <div className="main-main-container">
      <div className='main-container'>
      <div className='forgot-container'>
        <div className='welcome-div'>
          <h2>Change password</h2>
          <p>Enter current Password<br/> and New passowrd<br/> correctly..</p>
        </div>

        <form onSubmit={(e)=>changePass(e)} className='login-form'>

          <input 
            autoComplete='true' 
            type='text' 
            placeholder='Current password' 
            required 
            ref={e => inputElem.current.old = e}
            onChange={()=>setError({type:"oldpass",value :inputElem.current.old.value,oldpass:userObj.password})}
          />
          <div className='error2'>{error.current}</div>

          
          <input 
            onChange={e => setError({type:"password",value : e.target.value})} 
            autoComplete='true' 
            type='password' 
            placeholder='New password'
            required 
            ref={e => inputElem.current.newPass = e}
          />
          <div className='error2'>{error.password}</div>

           <input 
            onChange={e => setError({type:"conpass",value : e.target.value,pass : inputElem.current.newPass.value})} 
            autoComplete='true' 
            type='password' 
            placeholder='confirm password' 
            required 
          />
          <div className='error2'>{error.conpass}</div>

          <input className='submit-btn' type="submit" value='Change password' />
          <button onClick={()=>{
            sessionStorage.clear();
            navigate('/login');
          }} className='cancel-btn'>Cancel</button>
        </form>

      </div>
    </div>
    </div>
    <ToastContainer autoClose={1000} />
     
    </>
  )
}