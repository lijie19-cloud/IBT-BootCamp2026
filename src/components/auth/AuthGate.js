"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGate({ children, role }) {
  const { user, isReady } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    else if (role && user.role !== role) router.replace("/profile?notice=role");
  }, [isReady, pathname, role, router, user]);

  if (!isReady || !user || (role && user.role !== role)) return <div className="auth-gate-loading" aria-live="polite"><span className="spinner" aria-hidden="true" />Checking your demo session…</div>;
  return children;
}
