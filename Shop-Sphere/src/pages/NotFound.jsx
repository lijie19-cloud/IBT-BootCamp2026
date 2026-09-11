import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="not-found"> <div className="container">
    <h1>Oops!</h1>

    <h2>404</h2>

    <p>
      The page you are looking for does not exist.
    </p>

    <Link
      to="/"
      className="hero-button"
    >
      Go Home
    </Link>

  </div>
</main>

);
}

export default NotFound;