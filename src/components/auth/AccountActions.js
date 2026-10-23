"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountActions({ mobile = false }) {
  const router = useRouter();
  const { user, isReady, logout } = useAuth();
  const className = mobile ? "mobile-account-actions" : "account-actions";

  if (!isReady) return <div className={`${className} account-loading`} aria-label="Loading account" />;
  if (!user) return <div className={className}><Link className="nav-login" href="/login">Log in</Link><Link className="button button-primary nav-signup" href="/signup">Register</Link></div>;

  function handleLogout() {
    logout();
    router.push("/");
    router.refresh();
  }

  const messagesHref = user.role === "seller" ? "/seller/messages" : "/messages";
  return <div className={className}><Link className="nav-login" href={messagesHref}>Messages</Link><Link className="nav-login" href={user.role === "seller" ? "/seller/dashboard" : "/profile"}>{user.fullName.split(" ")[0]}</Link><button className="button button-secondary nav-signup" type="button" onClick={handleLogout}>Sign out</button></div>;
}
