import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const location = useLocation();

  // ========================================
  // FORM STATE
  // ========================================

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // WHERE USER CAME FROM
  // ========================================

  const from = location.state?.from?.pathname || "/";

  // ========================================
  // SIGN IN
  // ========================================

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    // ======================================
    // VALIDATION
    // ======================================

    if (!email.trim()) {
      setError("Please enter your email.");

      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");

      return;
    }

    // ======================================
    // DEMO AUTHENTICATION
    // ======================================

    localStorage.setItem("isAuthenticated", "true");

    // ======================================
    // RETURN USER
    // TO ORIGINAL PAGE
    // ======================================

    navigate(from, {
      replace: true,
    });
  }

  return (
    <section className="signin-page">
      <div className="signin-card">
        <p className="section-label">WELCOME BACK</p>

        <h1>Sign In</h1>

        <p>Sign in to continue to checkout.</p>

        {/* ==================================
            ERROR
        ================================== */}

        {error && <p className="form-error">{error}</p>}

        {/* ==================================
            FORM
        ================================== */}

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>

          <button type="submit" className="btn">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
