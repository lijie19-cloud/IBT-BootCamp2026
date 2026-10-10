import Link from "next/link";
import DishCard from "../components/DishCard";
import { getDishes } from "./lib/dishes";

export default function HomePage() {
  const popularDishes = getDishes().filter((dish) => dish.popular);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Addis Eats",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    description: "Discover Ethiopian favorites and order delicious meals.",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> THE TASTE OF ETHIOPIA
            </span>
            <h1>
              Your favorites.
              <br />
              <span>Made with soul.</span>
            </h1>
            <p>
              From comforting shiro to rich doro wat, discover Ethiopian flavors
              made for sharing and delivered with care.
            </p>
            <div className="hero-actions">
              <Link href="/menu" className="button button-primary">
                Explore the menu <span aria-hidden="true">→</span>
              </Link>
              <span className="hero-note">Fresh flavor, every time.</span>
            </div>
            <div className="hero-stats">
              <div>
                <strong>100%</strong>
                <span>Ethiopian flavor</span>
              </div>
              <div>
                <strong>Made fresh</strong>
                <span>With care</span>
              </div>
              <div>
                <strong>For everyone</strong>
                <span>Plant-based options</span>
              </div>
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="Illustration of Ethiopian food"
          >
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-food-circle">
              <span aria-hidden="true">🍲</span>
            </div>
            <div className="floating-note note-top">
              <span>✦</span>
              <div>
                <strong>Local favorites</strong>
                <small>Big, bold flavor</small>
              </div>
            </div>
            <div className="floating-note note-bottom">
              <span className="note-emoji">🫓</span>
              <div>
                <strong>Made for sharing</strong>
                <small>Gather around</small>
              </div>
            </div>
            <span className="hero-spark spark-one">✳</span>
            <span className="hero-spark spark-two">✦</span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM OUR KITCHEN</span>
            <h2>Customer favorites</h2>
            <p>Classic dishes, full of character.</p>
          </div>
          <Link href="/menu" className="text-link">
            View full menu <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="dish-grid">
          {popularDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>
      <section className="story-band">
        <div className="container story-inner">
          <span className="story-icon" aria-hidden="true">
            ☕
          </span>
          <div>
            <span className="eyebrow">ROOTED IN TRADITION</span>
            <h2>Food tastes better when it brings us together.</h2>
            <p>
              We celebrate the dishes, spices, and generous spirit that make
              Ethiopian food special.
            </p>
          </div>
          <Link href="/menu" className="button button-light">
            Find your favorite
          </Link>
        </div>
      </section>
    </main>
  );
}
