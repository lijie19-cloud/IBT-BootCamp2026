import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-content">
        {/* =========================
            ERROR CODE
        ========================= */}
        <div className="not-found-code">404</div>

        {/* =========================
            MESSAGE
        ========================= */}
        <span className="section-label">Page Not Found</span>

        <h1>Oops! We can't find that page.</h1>

        <p>
          The page you are looking for may have been moved, deleted, or the URL
          may be incorrect. Let's get you back to CampusConnect.
        </p>

        {/* =========================
            ACTION BUTTONS
        ========================= */}
        <div className="not-found-actions">
          <Link to="/" className="not-found-button">
            ← Back to Home
          </Link>

          <Link to="/clubs" className="not-found-button secondary">
            Explore Clubs
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
