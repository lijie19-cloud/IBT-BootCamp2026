import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="not-found-code">404</span>
      <h1>We couldn’t find that order.</h1>
      <p>Check the tracking link or return to the Addis Eats home page.</p>
      <Link href="/" className="primary-button">
        Back to home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
