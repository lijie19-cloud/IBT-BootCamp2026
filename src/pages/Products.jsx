// Import React hooks
import { useEffect, useMemo, useState } from "react";

// Import product API function
import { loadProducts } from "../api";

// Import reusable product card
import ProductCard from "../components/ProductCard";

// Products page
function Products() {
  // Store all products loaded from the API
  const [products, setProducts] = useState([]);

  // Store search text
  const [search, setSearch] = useState("");

  // Store selected category
  const [category, setCategory] = useState("All");

  // Store selected sorting option
  const [sortBy, setSortBy] = useState("default");

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Load products when the page starts
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await loadProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Get unique product categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products.map((product) => product.category)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // Search, filter, and sort products
  const filteredProducts = useMemo(() => {
    // Create a new array
    let result = [...products];

    // Normalize search text
    const searchText = search.trim().toLowerCase();

    // Filter by search
    if (searchText) {
      result = result.filter((product) => {
        const productName =
          product.name?.toLowerCase() || "";

        const productCategory =
          product.category?.toLowerCase() || "";

        return (
          productName.includes(searchText) ||
          productCategory.includes(searchText)
        );
      });
    }

    // Filter by category
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;

      case "name-az":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "name-za":
        result.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, search, category, sortBy]);

  // Clear all controls
  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSortBy("default");
  }

  // Loading state
  if (loading) {
    return (
      <section className="page-section">
        <h1>Products</h1>

        <p className="status-message">
          Loading products...
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="page-section">
        <h1>Products</h1>

        <p className="error-message">
          {error}
        </p>
      </section>
    );
  }

  // Products page
  return (
    <section className="products-page">
      {/* Page heading */}
      <div className="page-section-header">
        <div>
          <h1>Our Products</h1>

          <p>
            Browse, search, filter, and sort our products.
          </p>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="product-controls">
        {/* Search */}
        <div className="search-control">
          <label htmlFor="product-search">
            Search Products
          </label>

          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by product name or category..."
          />
        </div>

        {/* Category */}
        <div className="filter-control">
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div className="filter-control">
          <label htmlFor="sort-products">
            Sort By
          </label>

          <select
            id="sort-products"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="default">
              Default
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="name-az">
              Name: A to Z
            </option>

            <option value="name-za">
              Name: Z to A
            </option>
          </select>
        </div>

        {/* Clear filters */}
        <button
          className="clear-filters-button"
          type="button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* Results information */}
      <div className="results-info">
        <p>
          Showing{" "}
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          of{" "}
          <strong>
            {products.length}
          </strong>{" "}
          products
        </p>
      </div>

      {/* Product results */}
      {filteredProducts.length === 0 ? (
        <div className="empty-results">
          <h2>No Products Found</h2>

          <p>
            Try changing your search or filter options.
          </p>

          <button
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;