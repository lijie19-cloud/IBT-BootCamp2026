import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status-card">
        <span className="status-code">404</span>

        <h1>Dish Not Found</h1>

        <p>Sorry, we couldn't find that dish.</p>

        <Link href="/menu" className="btn btn-primary">
          Back to Menu
        </Link>
      </div>
    </main>
  );
}
