import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children, role }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function userFetch() {
      try {
        const { data: userDetails } = await axios.get(
          "http://localhost:3001/user/details",
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

  // ⏳ While checking auth
  if (loading) return <div>Loading...</div>;

  // ❌ Not logged in
  if (!user || !user.login) return <Navigate to="/login" />;

  // 🔐 Role-based restriction
  if (role && user.role !== role) return <Navigate to="/" />;

  // 👍 Authorized
  return children;
}
