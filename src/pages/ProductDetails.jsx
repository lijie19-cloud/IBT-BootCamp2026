// Import React hooks
import { useEffect, useMemo, useState } from "react";

// Import React Router hooks
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

// Import API function
import { loadProducts } from "../api";

// Import reusable ProductCard
import ProductCard from "../components/ProductCard";

// Import Cart Context
import { useCart } from "../context/CartContext";

// Product Details page
function ProductDetails() {
  // Get product ID from the URL
  const { id } = useParams();

  // Navigation function
  const navigate = useNavigate();

  // Get cart function
  const { addToCart } = useCart();

  // Store selected product
  const [product, setProduct] = useState(null);

  // Store all products
  const [products, setProducts] = useState([]);

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Success message
  const [successMessage, setSuccessMessage] = useState("");

  // Load products
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        // Load all products
        const data = await loadProducts();

        // Save all products
        setProducts(data);

        // Find the requested product
        const selectedProduct = data.find(
          (item) => String(item.id) === String(id)
        );

        // If product doesn't exist
        if (!selectedProduct) {
          setError("Product not found.");
          setProduct(null);
          return;
        }

        // Save selected product
        setProduct(selectedProduct);

        // Reset quantity when product changes
        setQuantity(1);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load product details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Update document title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | ShopSphere`;
    } else {
      document.title = "Product Details | ShopSphere";
    }

    // Restore default title when leaving the page
    return () => {
      document.title = "ShopSphere";
    };
  }, [product]);

  // Find related products
  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter(
        (item) =>
          item.category === product.category &&
          String(item.id) !== String(product.id)
      )
      .slice(0, 4);
  }, [products, product]);

  // Increase quantity
  function increaseQuantity() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  // Decrease quantity
  function decreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  }

  // Add selected quantity to cart
  function handleAddToCart() {
    if (!product) {
      return;
    }

    // Add product once for each selected quantity
    for (let index = 0; index < quantity; index++) {
      addToCart(product);
    }

    // Show local success message
    setSuccessMessage(
      `${quantity} × ${product.name} added to your cart.`
    );

    // Remove message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  // Loading state
  if (loading) {
    return (
      <section className="page-section">
        <p className="status-message">
          Loading product details...
        </p>
      </section>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <section className="product-not-found">
        <h1>Product Not Found</h1>

        <p>
          {error ||
            "The product you are looking for does not exist."}
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </section>
    );
  }

  // Product details
  return (
    <section className="product-details-page">
      {/* Breadcrumb */}
      <nav
        className="breadcrumb"
        aria-label="Breadcrumb"
      >
        <Link to="/">Home</Link>

        <span>/</span>

        <Link to="/products">
          Products
        </Link>

        <span>/</span>

        <span>{product.name}</span>
      </nav>

      {/* Product details */}
      <div className="product-details">
        {/* Product image */}
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product information */}
        <div className="product-details-content">
          <span className="product-details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          {/* Rating */}
          {product.rating !== undefined && (
            <div className="product-details-rating">
              <span>★</span>

              <strong>
                {product.rating}
              </strong>

              <span>/ 5</span>
            </div>
          )}

          {/* Description */}
          <p className="product-details-description">
            {product.description ||
              "This is a high-quality product available from ShopSphere."}
          </p>

          {/* Price */}
          <div className="product-details-price">
            {Number(product.price).toLocaleString()} ETB
          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <h3>Quantity</h3>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Selected total */}
          <div className="selected-total">
            <span>Total:</span>

            <strong>
              {(
                Number(product.price) * quantity
              ).toLocaleString()}{" "}
              ETB
            </strong>
          </div>

          {/* Success message */}
          {successMessage && (
            <p className="product-success-message">
              ✓ {successMessage}
            </p>
          )}

          {/* Actions */}
          <div className="product-details-actions">
            <button
              className="add-details-cart-button"
              type="button"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="back-products-button"
              type="button"
              onClick={() => navigate("/products")}
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="related-products-header">
            <h2>Related Products</h2>

            <Link to="/products">
              View All Products
            </Link>
          </div>

          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default ProductDetails;
