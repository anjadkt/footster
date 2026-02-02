import { Navigate } from "react-router-dom";
import { useState , useEffect } from "react";
import Spinner from "../components/spinner.jsx"
import api from '../services/axios.js'

export default function PublicRoute ({children}){
 const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
    async function userFetch() {
      try {
        const { data: userDetails } = await api.get(
          "/user/details"
        );
        setUser(userDetails[0]);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    userFetch();
  }, []);

  if (loading) return <Spinner/>;
  
 if(user && user.role === "user" &&  user.login){
  return <Navigate to={'/'} replace />
 }

 if(user && user.role === "admin" &&  user.login){
  return <Navigate to={'/dashboard'} replace />
 }

 return children
}