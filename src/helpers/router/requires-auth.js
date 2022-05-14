import { Navigate } from "react-router-dom";
import { useAuth } from "../context";
import { requests } from "../utils";

export const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to={requests.home} replace />;
};
