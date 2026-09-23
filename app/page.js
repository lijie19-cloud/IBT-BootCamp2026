import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">🇪🇹 Authentic Ethiopian Cuisine</span>

        <h1>
          Welcome to <span>Addis Eats</span>
        </h1>

        <p>
          Experience the rich flavors of Ethiopian cuisine from the comfort of
          your home.
        </p>

        <p>
          Discover traditional dishes including Kitfo, Shiro Wot, Firfir and
          Tibs.
        </p>

        <div className="hero-actions">
          <Link href="/menu" className="primary-button">
            Explore Our Menu
          </Link>

          <Link href="/cart" className="secondary-button">
            View Cart
          </Link>
        </div>
      </div>
    </section>
  );
}
