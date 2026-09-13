import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadProducts } from "../api";

function Categories() {
  // =========================================
  // PRODUCTS STATE
  // =========================================

  const [products, setProducts] = useState([]);

  // =========================================
  // LOADING STATE
  // =========================================

  const [loading, setLoading] = useState(true);

  // =========================================
  // ERROR STATE
  // =========================================

  const [error, setError] = useState("");

  // =========================================
  // LOAD PRODUCTS
  // =========================================

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await loadProducts();

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // =========================================
  // CREATE CATEGORY DATA
  // =========================================

  const categories = [
    "Electronics",
    "Clothing",
    "Beauty",
    "Home",
    "Accessories",
  ];

  // =========================================
  // COUNT PRODUCTS IN EACH CATEGORY
  // =========================================

  function getCategoryCount(category) {
    return products.filter((product) => product.category === category).length;
  }

  // =========================================
  // LOADING UI
  // =========================================

  if (loading) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="status-message">
            <p>Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // ERROR UI
  // =========================================

  if (error) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="error-message">
            <h2>Unable to load categories</h2>

            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // CATEGORIES PAGE
  // =========================================

  return (
    <section className="page-section">
      <div className="container">
        {/* PAGE HEADING */}
        <div className="page-heading">
          <span className="section-label">SHOP BY CATEGORY</span>

          <h2>Explore Categories</h2>

          <p>
            Find the products you need by browsing our different categories.
          </p>
        </div>

        {/* CATEGORY GRID */}
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categories/${category}`}
              className="category-card"
            >
              <div className="category-icon">
                {category === "Electronics" && "💻"}

                {category === "Clothing" && "👕"}

                {category === "Beauty" && "💄"}

                {category === "Home" && "🏠"}

                {category === "Accessories" && "👜"}
              </div>

              <h3>{category}</h3>

              <p>
                {getCategoryCount(category)}{" "}
                {getCategoryCount(category) === 1 ? "Product" : "Products"}
              </p>

              <span className="category-link">Browse Category →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
