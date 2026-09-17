import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function RequireAuth() {
  // Get authentication status.
  const { isAuthenticated } = useAuth();

  // Redirect unauthenticated users.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow authenticated users.
  return <Outlet />;
}

export default RequireAuth;
