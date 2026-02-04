import { Navigate } from "react-router-dom";
import Spinner from "../components/spinner.js"
import {useSelector} from 'react-redux'

export default function PublicRoute ({children}){

  const {loading,role,login} = useSelector(state => state.user);
 
 if (loading) return <Spinner/>;
  
 if(role === "user" &&  login){
  return <Navigate to={'/'} replace />
 }

 if(role === "admin" &&  login){
  return <Navigate to={'/dashboard'} replace />
 }

 return children
}