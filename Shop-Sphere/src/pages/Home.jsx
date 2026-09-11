import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductGrid from "../components/ProductGrid";
import { loadProducts } from "../api";
import { useCart } from "../context/CartContext";

function Home() {
  // Store all products
  const [products, setProducts] = useState([]);

  // Store loading state
  const [loading, setLoading] = useState(true);

  // Store error message
  const [error, setError] = useState("");

  // Get addToCart from Cart Context
  const { addToCart } = useCart();

  // Load products when the page starts
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await loadProducts();

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Select featured products
  const featuredProducts = products.slice(0, 4);

  // Create category list
  const categories = [
    {
      name: "Electronics",
      description: "Discover phones, headphones, watches and more.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      name: "Clothing",
      description: "Find stylish products for your everyday life.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    },
    {
      name: "Beauty",
      description: "Take care of yourself with our beauty collection.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    },
  ];

  return (
    <main className="home-page">
      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-label">Welcome to ShopSphere</span>

            <h1>
              Everything You Need,
              <br />
              All in One Place.
            </h1>

            <p>
              Discover quality electronics, clothing and beauty products at
              great prices.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="hero-button">
                Shop Now
              </Link>

              <Link to="/categories" className="secondary-button">
                Explore Categories
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt="Online shopping"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          CATEGORY SECTION
      ========================================= */}

      <section className="home-categories">
        <div className="container">
          <div className="section-heading">
            <span>Shop by category</span>

            <h2>Find What You Need</h2>

            <p>Explore our most popular product categories.</p>
          </div>

          <div className="home-category-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="home-category-card"
              >
                <img src={category.image} alt={category.name} />

                <div className="home-category-content">
                  <h3>{category.name}</h3>

                  <p>{category.description}</p>

                  <span>Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          FEATURED PRODUCTS
      ========================================= */}

      <section className="featured-products">
        <div className="container">
          <div className="section-heading">
            <span>Our selection</span>

            <h2>Featured Products</h2>

            <p>Check out some of our popular products.</p>
          </div>

          {loading && (
            <p className="status-message">Loading featured products...</p>
          )}

          {error && <p className="error-message">{error}</p>}

          {!loading && !error && featuredProducts.length > 0 && (
            <ProductGrid products={featuredProducts} onAddToCart={addToCart} />
          )}

          {!loading && !error && featuredProducts.length === 0 && (
            <p className="empty-state">No featured products available.</p>
          )}

          <div className="view-all-products">
            <Link to="/products" className="hero-button">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          PROMOTION SECTION
      ========================================= */}

      <section className="promotion">
        <div className="container promotion-content">
          <div>
            <span className="promotion-label">Shop smarter</span>

            <h2>
              Quality Products.
              <br />
              Great Prices.
            </h2>

            <p>
              Shop electronics, clothing, beauty products and more from one
              convenient place.
            </p>

            <Link to="/products" className="promotion-button">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
