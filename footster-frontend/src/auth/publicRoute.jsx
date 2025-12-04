import { Navigate } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios"
import Spinner from "../components/spinner.jsx"

export default function PublicRoute ({children}){
 const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
    async function userFetch() {
      try {
        const { data: userDetails } = await axios.get(
          "https://footster-api.onrender.com//user/details",
          { withCredentials: true }
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