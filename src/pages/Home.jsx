import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-content">
          <span className="hero-label">Welcome to Addis Eats</span>

          <h2>The Authentic Taste of the Ethiopian Highlands</h2>

          <p>
            Discover delicious Ethiopian dishes prepared with authentic flavors
            and fresh ingredients.
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="primary-button">
              Explore Menu
            </Link>

            <Link to="/cart" className="secondary-button">
              View Cart
            </Link>
          </div>
        </div>
      </div>

      <section className="features">
        <div className="feature-card">
          <span>🍛</span>
          <h2>Authentic Food</h2>
          <p>Traditional Ethiopian dishes.</p>
        </div>

        <div className="feature-card">
          <span>🌿</span>
          <h2>Fresh Ingredients</h2>
          <p>Fresh and quality ingredients.</p>
        </div>

        <div className="feature-card">
          <span>🚚</span>
          <h2>Easy Ordering</h2>
          <p>Simple and convenient ordering.</p>
        </div>
      </section>
    </section>
  );
}

export default Home;
