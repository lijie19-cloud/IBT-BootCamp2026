import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page home-page">
      <div className="container">
        <div className="hero">
          <div className="hero-content">
            <p className="hero-label">WELCOME TO SHOPSPHERE</p>

            <h2>
              Shop smarter.
              <br />
              Shop better.
            </h2>

            <p className="hero-description">
              Discover quality products at great prices. Explore our collection
              and find what you need.
            </p>

            <Link to="/products" className="button primary-button">
              Shop Now
            </Link>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <span>🛍️</span>
              <h3>Everything you need</h3>
              <p>All in one place.</p>
            </div>
          </div>
        </div>

        <section className="welcome-section">
          <h2>Welcome to ShopSphere</h2>

          <p>
            ShopSphere is your modern online shopping destination. Browse
            products, discover categories, and build your cart.
          </p>
        </section>
      </div>
    </section>
  );
}

export default Home;
