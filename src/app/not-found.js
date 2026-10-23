import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="recovery-page">
      <div className="empty-state">
        <span aria-hidden="true">404</span>
        <h1>That page is not available.</h1>
        <p>The address may be incorrect, or the demo content may have moved.</p>
        <Link className="button button-primary" href="/products">
          Browse products
        </Link>
      </div>
    </main>
  );
}
