import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ logged }) => {
  const location = useLocation();
  return logged ? (
    <Outlet />
  ) : (
    // <Outlet />
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;