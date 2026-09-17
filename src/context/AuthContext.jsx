import { createContext, useContext, useState } from "react";

// Create Auth Context.
const AuthContext = createContext(null);

// Auth Provider
export function AuthProvider({ children }) {
  // Store logged-in user.
  const [user, setUser] = useState(null);

  // Login function.
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function.
  const logout = () => {
    setUser(null);
  };

  // Check whether a user is logged in.
  const isAuthenticated = Boolean(user);

  // Values shared through Context.
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom Context hook.
export function useAuthContext() {
  const context = useContext(AuthContext);

  // Make sure the hook is used inside AuthProvider.
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
