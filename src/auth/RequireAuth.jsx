import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  // ========================================
  // CURRENT LOCATION
  // ========================================

  const location = useLocation();

  // ========================================
  // CHECK AUTHENTICATION
  // ========================================

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // ========================================
  // NOT AUTHENTICATED
  // ========================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ========================================
  // AUTHENTICATED
  // ========================================

  return children;
}
