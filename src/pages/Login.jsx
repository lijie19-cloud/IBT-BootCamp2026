import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Login() {
  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  // If already authenticated,
  // don't show the login page.
  if (isAuthenticated) {
    return <Navigate to="/checkout" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    login({
      name: name.trim(),
      email: email.trim(),
    });

    // Return to the requested page,
    // otherwise go to checkout.
    const destination = location.state?.from?.pathname || "/checkout";

    navigate(destination, {
      replace: true,
    });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Sign In</h1>

        <p>Sign in to continue to checkout.</p>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <button type="submit" className="primary-button full-width">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
