import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  if (!auth) return null;
  const { isAuthenticated } = auth;

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
