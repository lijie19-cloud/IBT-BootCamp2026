import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-content">
        <span className="error-code">404</span>

        <h1>Page Not Found</h1>

        <p>Sorry, the page you are looking for does not exist.</p>

        <Link to="/" className="primary-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
