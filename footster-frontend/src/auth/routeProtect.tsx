import { Navigate } from "react-router-dom";
import Spinner from "../components/spinner";
import {useSelector} from 'react-redux'

export default function ProtectedRoute({ children, role }) {
  const userRole = useSelector(state => state.user.role);
  const {loading , login } = useSelector(state => state.user);

  if (loading) return <Spinner />;

  if (!login && login !== null) return <Navigate to="/login" />;

  if (role && userRole && userRole !== role) return <Navigate to="/" />;

  return children;
}
