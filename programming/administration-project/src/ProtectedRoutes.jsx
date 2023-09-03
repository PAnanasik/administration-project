import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLogged = window.localStorage.getItem("loggedIn")
  const token = window.localStorage.getItem("token")
  const location = useLocation();
  return isLogged && token ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;