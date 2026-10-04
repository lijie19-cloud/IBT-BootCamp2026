import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="section-label">Welcome to Addis Eats</span>

          <h1>
            Taste
            <br />
            <span>Addis.</span>
          </h1>

          <p>
            Authentic Ethiopian flavors, delicious dishes, and a simple modern
            ordering experience.
          </p>

          <div className="hero-buttons">
            <Link href="/menu" className="primary-button">
              Explore Menu
              <span>→</span>
            </Link>

            <Link href="/orders/1001" className="secondary-button">
              Track Order
            </Link>
          </div>
        </div>

        <div className="hero-food">
          <div className="food-circle">🍛</div>

          <div className="floating-card card-one">
            <span>🔥</span>
            <div>
              <strong>Fresh</strong>
              <small>Every day</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <span>⭐</span>
            <div>
              <strong>Authentic</strong>
              <small>Ethiopian taste</small>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <Feature
          icon="🔎"
          title="Smart Search"
          text="Find your favorite dishes quickly with intelligent debounced search."
        />

        <Feature
          icon="⚡"
          title="Live Updates"
          text="Track your order with automatic status updates every five seconds."
        />

        <Feature
          icon="🛒"
          title="Easy Cart"
          text="Add dishes to your cart with fast client-side cache updates."
        />
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>

      <h2>{title}</h2>

      <p>{text}</p>
    </article>
  );
}
