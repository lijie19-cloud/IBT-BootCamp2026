import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="container">
        <div className="empty-state">
          <span className="eyebrow">404 · Not on the menu</span>
          <h1>We couldn't find that page.</h1>
          <p>The page or dish may have moved.</p>
          <Link className="btn btn-primary" href="/menu">
            Back to menu
          </Link>
        </div>
      </div>
    </div>
  );
}
