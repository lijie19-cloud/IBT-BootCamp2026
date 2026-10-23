"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "./AuthGate";
import { useAuth } from "@/context/AuthContext";

function ProfileContent() {
  const router = useRouter();
  const { user, updateProfile, logout } = useAuth();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true); setErrors({}); setMessage("");
    const data = new FormData(event.currentTarget);
    const result = updateProfile({ fullName: data.get("fullName"), location: data.get("location") });
    if (!result.ok) setErrors(result.errors || {});
    else setMessage("Your demo profile was updated on this browser.");
    setIsSaving(false);
  }

  function handleSignOut() { logout(); router.replace("/"); router.refresh(); }

  return <div className="profile-layout"><aside className="profile-summary"><div className="profile-avatar">{user.fullName.charAt(0)}</div><p className="eyebrow">{user.role} account</p><h1>{user.fullName}</h1><p>{user.email}</p><span className="demo-badge">Local demo session</span></aside><section className="profile-panel"><div><p className="eyebrow">Account settings</p><h2>Profile details</h2><p>These details are stored only in this browser and are not shared with other users or devices.</p></div><form className="auth-form profile-form" onSubmit={handleSubmit}>{message && <p className="form-alert success" role="status">{message}</p>}<label className="field"><span>Full name</span><input name="fullName" defaultValue={user.fullName} maxLength="80" />{errors.fullName && <small>{errors.fullName}</small>}</label><label className="field"><span>Email</span><input value={user.email} disabled /><small>Email changes require a production verification flow.</small></label><label className="field"><span>Location</span><input name="location" defaultValue={user.location} maxLength="80" placeholder="City or region" />{errors.location && <small>{errors.location}</small>}</label><div className="profile-actions"><button className="button button-primary" type="submit" disabled={isSaving}>{isSaving ? "Saving…" : "Save profile"}</button><button className="button button-secondary" type="button" onClick={handleSignOut}>Sign out</button></div></form></section></div>;
}

export default function ProfileView() {
  return <AuthGate><ProfileContent /></AuthGate>;
}
