import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";
import { requests } from "../utils";

export const RedirectAuth = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={requests.home} replace /> : <Outlet />;
};
