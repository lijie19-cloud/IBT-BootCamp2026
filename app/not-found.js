import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section">
      <span className="eyebrow">404 — PAGE NOT FOUND</span>
      <h1>Oops! This page is off the menu.</h1>
      <p>
        The page you requested could not be found. Let's help you discover
        something delicious.
      </p>
      <Link href="/menu" className="button button-primary">
        Explore Our Menu
      </Link>
    </section>
  );
}
