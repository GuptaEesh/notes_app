import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

export const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" replace />;
};
