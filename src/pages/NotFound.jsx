import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate("/");
  }

  return (
    <section className="page not-found-page">
      <div className="container">
        <div className="not-found-card">
          <p className="error-code">404</p>

          <h2>Oops!</h2>

          <p>The page you are looking for does not exist.</p>

          <button
            type="button"
            className="button primary-button"
            onClick={handleGoHome}
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
