import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-page">
      {/* ================================
          HERO SECTION
      ================================= */}

      <div className="hero">
        <div className="hero-content">
          <p className="hero-label">AUTHENTIC ETHIOPIAN CUISINE</p>

          <h1>Welcome to Addis Eats</h1>

          <p>
            Discover delicious Ethiopian dishes prepared with traditional
            ingredients, authentic spices, and unforgettable flavors.
          </p>

          <Link to="/menu" className="btn">
            Explore Our Menu
          </Link>
        </div>
      </div>

      {/* ================================
          ABOUT SECTION
      ================================= */}

      <section className="home-about">
        <h2>Taste Ethiopia</h2>

        <p>
          From Kitfo and Tibs to Shiro Wot and traditional breakfast dishes,
          Addis Eats brings the flavors of Ethiopia to your table.
        </p>

        <Link to="/menu" className="text-link">
          View all dishes →
        </Link>
      </section>
    </section>
  );
}
