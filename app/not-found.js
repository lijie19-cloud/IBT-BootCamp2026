import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <span className="eyebrow">404 — NOT ON THE MENU</span>
      <h1>
        We couldn't find that page<span>.</span>
      </h1>
      <p>The page may have moved, or the dish may not be available.</p>
      <Link href="/menu" className="button button-primary">
        Explore the menu
      </Link>
    </main>
  );
}
