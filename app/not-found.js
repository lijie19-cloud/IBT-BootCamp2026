import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-number">404</div>

      <h1>Page Not Found</h1>

      <p>Sorry, the page or dish you are looking for doesn't exist.</p>

      <div className="hero-actions">
        <Link href="/" className="primary-button">
          Go Home
        </Link>

        <Link href="/menu" className="secondary-button">
          View Menu
        </Link>
      </div>
    </section>
  );
}
