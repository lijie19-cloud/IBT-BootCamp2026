import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="section-label">ERROR</p>

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>Sorry, the page you're looking for doesn't exist.</p>

      <Link to="/" className="btn">
        Go Home
      </Link>
    </section>
  );
}
