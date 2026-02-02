import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/spinner";
import api from '../services/axios'

export default function ProtectedRoute({ children, role }) {
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

  if (loading) return <Spinner />;

  if (!user || !user.login) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}
