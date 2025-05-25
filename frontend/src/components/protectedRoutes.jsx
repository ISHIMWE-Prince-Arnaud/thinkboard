import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;