import { Navigate } from "react-router-dom";
import Spinner from "../components/spinner.js"
import {useSelector} from 'react-redux'
import type { RootState } from "../app/store/store.js";

type Props = {
  children:React.ReactNode
}

export default function PublicRoute ({children}:Props){

  const {loading,role,login} = useSelector((state:RootState) => state.user);
 
 if (loading) return <Spinner/>;
  
 if(role === "user" &&  login){
  return <Navigate to={'/'} replace />
 }

 if(role === "admin" &&  login){
  return <Navigate to={'/dashboard'} replace />
 }

 return children
}