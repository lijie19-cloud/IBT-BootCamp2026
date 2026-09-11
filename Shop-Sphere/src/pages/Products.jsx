import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/ProductGrid";

import { loadProducts } from "../api";

import { useCart } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("default");

  const [searchParams, setSearchParams] = useSearchParams();

  // ==========================================
  // GET CART FUNCTION
  // ==========================================

  const { addToCart } = useCart();

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

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

  // ==========================================
  // READ CATEGORY FROM URL
  // ==========================================

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="products-page">
        <div className="container">
          <p className="status-message">Loading products...</p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="products-page">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </main>
    );
  }

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchesSearch = product.title.toLowerCase().includes(searchText);

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // SORT PRODUCTS
  // ==========================================

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-low") {
      return a.price - b.price;
    }

    if (sort === "price-high") {
      return b.price - a.price;
    }

    if (sort === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  // ==========================================
  // CATEGORY CHANGE
  // ==========================================

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;

    setCategory(selectedCategory);

    if (selectedCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: selectedCategory,
      });
    }
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="products-page">
      <div className="container">
        <h2>Our Products</h2>

        <p className="page-description">
          Browse our collection of quality products.
        </p>

        {/* PRODUCT CONTROLS */}

        <section className="product-controls">
          <div className="control-group">
            <label htmlFor="search">Search Products</label>

            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="All">All</option>

              <option value="Electronics">Electronics</option>

              <option value="Clothing">Clothing</option>

              <option value="Beauty">Beauty</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="sort">Sort By</label>

            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="default">Default</option>

              <option value="price-low">Price Low → High</option>

              <option value="price-high">Price High → Low</option>

              <option value="rating">Rating High → Low</option>
            </select>
          </div>
        </section>

        {/* RESULT COUNT */}

        <p className="result-count">
          Showing {sortedProducts.length} product
          {sortedProducts.length !== 1 ? "s" : ""}
        </p>

        {/* PRODUCT GRID */}

        {sortedProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>

            <p>Try changing your search or category.</p>
          </div>
        ) : (
          <ProductGrid products={sortedProducts} onAddToCart={addToCart} />
        )}
      </div>
    </main>
  );
}

export default Products;
