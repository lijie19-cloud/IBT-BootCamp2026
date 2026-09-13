import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { loadProducts } from "../api";

function CategoryProducts() {
  // =========================================
  // GET CATEGORY FROM URL
  // =========================================

  const { category } = useParams();

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
  // FILTER PRODUCTS BY CATEGORY
  // =========================================

  const categoryProducts = useMemo(() => {
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }, [products, category]);

  // =========================================
  // GET DISPLAY CATEGORY NAME
  // =========================================

  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  // =========================================
  // LOADING UI
  // =========================================

  if (loading) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="status-message">
            <p>Loading {displayCategory} products...</p>
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
            <h2>Something went wrong</h2>

            <p>{error}</p>

            <Link to="/categories" className="btn btn-primary">
              Back to Categories
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // CATEGORY PAGE
  // =========================================

  return (
    <section className="page-section">
      <div className="container">
        {/* BACK LINK */}
        <Link to="/categories" className="back-link">
          ← Back to Categories
        </Link>

        {/* PAGE HEADING */}
        <div className="page-heading category-page-heading">
          <span className="section-label">CATEGORY</span>

          <h2>{displayCategory}</h2>

          <p>Browse our {displayCategory.toLowerCase()} products.</p>
        </div>

        {/* NO PRODUCTS */}
        {categoryProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>

            <p>
              There are currently no products in the {displayCategory} category.
            </p>

            <Link to="/categories" className="btn btn-primary">
              View Categories
            </Link>
          </div>
        ) : (
          <>
            {/* RESULT INFORMATION */}
            <div className="products-result-info">
              <p>
                Showing <strong>{categoryProducts.length}</strong>{" "}
                {categoryProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* PRODUCT GRID */}
            <div className="products-grid">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default CategoryProducts;
