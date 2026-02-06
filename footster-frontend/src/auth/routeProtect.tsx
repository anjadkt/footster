import { Navigate } from "react-router-dom";
import Spinner from "../components/spinner";
import {useSelector} from 'react-redux'
import type { RootState } from "../app/store/store";

type Props = {
  children : React.ReactNode;
  role ?: string
}

export default function ProtectedRoute({ children, role }:Props) {
  const userRole = useSelector((state:RootState) => state.user.role);
  const {loading , login } = useSelector((state:RootState) => state.user);

  if (loading) return <Spinner />;

  if (!login && login !== null) return <Navigate to="/login" />;

  if (role && userRole && userRole !== role) return <Navigate to="/" />;

  return children;
}
