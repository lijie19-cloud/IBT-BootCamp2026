import Link from "next/link";

export default function HomePage() {
  return (
    <main className="hero">
      <div className="hero-content">
        <p className="eyebrow">Welcome to Addis Eats</p>

        <h1>
          Delicious food,
          <br />
          delivered to you.
        </h1>

        <p>Discover your favorite Ethiopian meals and order them easily.</p>

        <div className="hero-actions">
          <Link href="/menu" className="button">
            Explore Menu
          </Link>

          <Link href="/orders" className="button secondary">
            My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
