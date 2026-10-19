import Link from "next/link";

const highlights = [
  {
    icon: "🍲",
    title: "Authentic Ethiopian Food",
    description: "Enjoy traditional recipes and the flavors of Ethiopia.",
  },
  {
    icon: "🥘",
    title: "Freshly Prepared",
    description: "Every dish is prepared with care and attention to flavor.",
  },
  {
    icon: "🛵",
    title: "Convenient Ordering",
    description:
      "Choose your favorite meals and follow your demo order's progress.",
  },
];

const featuredDishes = [
  { name: "Kitfo", price: 650, emoji: "🥩" },
  { name: "Doro Wat", price: 550, emoji: "🍗" },
  { name: "Shiro", price: 280, emoji: "🍲" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="eyebrow">THE TASTE OF ETHIOPIA</span>

            <h1>
              Discover the <span>real taste</span> of Ethiopia.
            </h1>

            <p>
              From traditional Kitfo to comforting Shiro, explore Ethiopian
              favorites made for sharing.
            </p>

            <div className="hero-actions">
              <Link href="/menu" className="button button-primary">
                Explore Our Menu →
              </Link>

              <Link href="/about" className="button button-outline">
                Our Story
              </Link>
            </div>

            <div className="hero-note">
              Fresh flavors. Traditional recipes. Ethiopian hospitality.
            </div>
          </div>

          <div className="hero-art" aria-label="Ethiopian food illustration">
            <div className="hero-circle">
              <span>🍛</span>
            </div>
            <div className="floating-label">
              <span>🇪🇹</span>
              Made with Ethiopian love
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHY ADDIS EATS?</span>
            <h2>Good food, beautiful traditions.</h2>
          </div>
        </div>

        <div className="highlight-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.title}>
              <span className="highlight-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CUSTOMER FAVORITES</span>
              <h2>Popular Ethiopian dishes</h2>
            </div>

            <Link href="/menu" className="text-link">
              View Full Menu →
            </Link>
          </div>

          <div className="dish-grid">
            {featuredDishes.map((dish) => (
              <article className="dish-card" key={dish.name}>
                <div className="dish-art" aria-hidden="true">
                  {dish.emoji}
                </div>

                <div className="dish-info">
                  <h3>{dish.name}</h3>
                  <p className="dish-price">
                    {dish.price.toLocaleString("en-US")} ETB
                  </p>
                  <Link href="/menu" className="button button-outline">
                    Explore Menu
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="order-banner">
        <div className="container banner-content">
          <div>
            <span className="eyebrow">YOUR NEXT FAVORITE MEAL</span>
            <h2>Ready to taste something wonderful?</h2>
            <p>Explore our menu and discover your next favorite dish.</p>
          </div>

          <Link href="/menu" className="button button-light">
            Order Your Meal →
          </Link>
        </div>
      </section>
    </>
  );
}
