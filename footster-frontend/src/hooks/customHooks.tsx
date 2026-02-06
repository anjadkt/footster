import { useEffect, useReducer, useState } from "react";
import api from '../services/axios'

type Action = {
  type:string;
  value : string;
  pass : string;
  oldpass : string;
}

type Error = {
  name : string;
  password : string;
  conpass : string;
  current : string;
  email : string
}

export function  useError (){
  const [error,setError] = useReducer(updateError,{name:"",password:"",conpass:"",current:"",email:""});

  function updateError(error:Partial<Error>,action:Action){
    const errorObj = {...error}
    switch(action.type){
      case "name":
        const value = action.value.trim();
        if(!value){
          errorObj.name = "Name is important!"
        }else{
          errorObj.name = ""
        }
        break;

      case "password":
        const length = action.value.length;
        if(length < 6){
          errorObj.password = "Password should be 6 charecter!"
        }else{
          errorObj.password = ""
        }
        break;
      
      case "conpass" :
        const old = action.pass ;
        if(old !== action.value){
          errorObj.conpass = "Enter same password!"
        }else{
          errorObj.conpass = ""
        }
        break;
      
      case "oldpass" :
        if(action.value !== action.oldpass){
          errorObj.current = "Wrong password!"
        }else{
          errorObj.current = ""
        }
        break;

      case "email" :
        const email = action.value;
        if(!email.includes('@gmail.com')){
          errorObj.email = "Enter a valid email!"
        }else{
          errorObj.email = ""
        }
        break; 
      
      default :
        break;
    }
    return errorObj ;
  }

  return [error,setError]
}

export function useFetch<T> (url:string):[T|null,boolean]{
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState<T|null>(null);
  useEffect(()=>{
    setLoading(true);
    api.get<T>(url)
    .then(dataList => setData(dataList.data) )
    .catch(err => console.log(err.message))
    .finally(()=>setLoading(false));
  },[url]);

  return [data,loading]
}