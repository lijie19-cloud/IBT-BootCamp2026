"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginWithMockAccount, registerMockAccount, restoreMockSession, signOutMockSession, updateMockProfile } from "@/lib/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const task = window.setTimeout(() => {
      setUser(restoreMockSession());
      setIsReady(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  const value = useMemo(() => ({
    user,
    isReady,
    async login(values) {
      const result = await loginWithMockAccount(values);
      if (result.ok) setUser(result.user);
      return result;
    },
    async register(values) {
      const result = await registerMockAccount(values);
      if (result.ok) setUser(result.user);
      return result;
    },
    updateProfile(values) {
      const result = updateMockProfile(user, values);
      if (result.ok) setUser(result.user);
      return result;
    },
    logout() {
      signOutMockSession();
      setUser(null);
    },
  }), [isReady, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
