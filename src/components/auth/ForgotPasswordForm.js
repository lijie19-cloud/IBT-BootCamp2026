"use client";

import Link from "next/link";
import { useState } from "react";
import { normalizeEmail } from "@/lib/validation/authValidation";

export default function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    const email = normalizeEmail(new FormData(event.currentTarget).get("email"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); setMessage(""); return; }
    setIsSubmitting(true); setError("");
    window.setTimeout(() => { setMessage("If this were a connected account, recovery instructions would be sent. No email was sent in this demo."); setIsSubmitting(false); }, 350);
  }

  return <form className="auth-form" onSubmit={handleSubmit} noValidate>{message && <p className="form-alert success" role="status">{message}</p>}{error && <p className="form-alert error" role="alert">{error}</p>}<label className="field"><span>Email address</span><input name="email" type="email" autoComplete="email" /></label><button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Preparing…" : "Prepare recovery"}</button><p className="auth-switch"><Link href="/login">← Return to login</Link></p></form>;
}
