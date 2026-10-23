"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignupForm() {
  const router = useRouter();
  const { register } = useAuth();
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
    const values = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
      role: form.get("role"),
    };
    try {
      const result = await register(values);
      if (!result.ok) {
        setErrors(result.errors || {});
        setFormError(
          result.formError || "Please review the highlighted fields.",
        );
        return;
      }
      router.replace(
        result.user.role === "seller" ? "/seller/dashboard" : "/profile",
      );
    } catch {
      setFormError(
        "The local demo account could not be created. Please try again.",
      );
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
      {formError && (
        <p className="form-alert error" role="alert">
          {formError}
        </p>
      )}
      <label className="field">
        <span>Full name</span>
        <input
          name="fullName"
          autoComplete="name"
          maxLength="80"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "signup-name-error" : undefined}
        />
        {errors.fullName && (
          <small id="signup-name-error">{errors.fullName}</small>
        )}
      </label>
      <label className="field">
        <span>Email address</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "signup-email-error" : undefined}
        />
        {errors.email && <small id="signup-email-error">{errors.email}</small>}
      </label>
      <fieldset className="role-field">
        <legend>Account role</legend>
        <label>
          <input type="radio" name="role" value="buyer" defaultChecked />
          <span>
            <strong>Buyer</strong>
            <small>Browse, save, and contact sellers.</small>
          </span>
        </label>
        <label>
          <input type="radio" name="role" value="seller" />
          <span>
            <strong>Seller</strong>
            <small>List products and answer buyers.</small>
          </span>
        </label>
        {errors.role && <small>{errors.role}</small>}
      </fieldset>
      <label className="field">
        <span>Password</span>
        <div className="password-field">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby="signup-password-help"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password ? (
          <small id="signup-password-help">{errors.password}</small>
        ) : (
          <small id="signup-password-help">
            8+ characters with uppercase, lowercase, and a number.
          </small>
        )}
      </label>
      <label className="field">
        <span>Confirm password</span>
        <input
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={
            errors.confirmPassword ? "signup-confirm-error" : undefined
          }
        />
        {errors.confirmPassword && (
          <small id="signup-confirm-error">{errors.confirmPassword}</small>
        )}
      </label>
      <button
        className="button button-primary submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account…" : "Create demo account"}
      </button>
      <p className="auth-switch">
        Already registered? <Link href="/login">Log in</Link>
      </p>
    </form>
  );
}
