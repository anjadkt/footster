import { Children, use } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute ({children}){
 const user = JSON.parse(localStorage.getItem('user')) || null;
 if(user && user.role === "user" &&  user.login){
  return <Navigate to={'/'} replace />
 }

 if(user && user.role === "admin" &&  user.login){
  return <Navigate to={'/dashboard'} replace />
 }

 return children
}