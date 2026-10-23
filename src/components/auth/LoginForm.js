"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrors({});
    setFormError("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await login({
        email: form.get("email"),
        password: form.get("password"),
      });
      if (!result.ok) {
        setErrors(result.errors || {});
        setFormError(result.formError || "Please review the form.");
        return;
      }
      router.replace(
        result.user.role === "seller" ? "/seller/dashboard" : "/profile",
      );
    } catch {
      setFormError("The local demo could not sign you in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {/* <div className="demo-credentials">
        <strong>Demo accounts</strong>
        <p>Buyer: buyer@markethub.demo / Buyer123!</p>
        <p>Seller: seller@markethub.demo / Seller123!</p>
      </div> */}
      {formError && (
        <p className="form-alert error" role="alert">
          {formError}
        </p>
      )}
      <label className="field">
        <span>Email address</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "login-email-error" : undefined}
        />
        {errors.email && <small id="login-email-error">{errors.email}</small>}
      </label>
      <label className="field">
        <span>Password</span>
        <div className="password-field">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <small id="login-password-error">{errors.password}</small>
        )}
      </label>
      <div className="form-row">
        <label className="check-label">
          <input type="checkbox" name="remember" disabled />
          <span>
            Remember me <small>(backend required for future milestone)</small>
          </span>
        </label>
        <Link className="text-link" href="/forgot-password">
          Forgot password?
        </Link>
      </div>
      <button
        className="button button-primary submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in…" : "Log in"}
      </button>
      <p className="auth-switch">
        New to MarketHub? <Link href="/signup">Create an account</Link>
      </p>
    </form>
  );
}
