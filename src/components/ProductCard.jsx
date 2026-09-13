// Import React Router Link
import { Link } from "react-router-dom";

// Import Cart Context
import { useCart } from "../context/CartContext";

// Product Card component
function ProductCard({ product }) {
  // Get addToCart from Context
  const { addToCart } = useCart();

  // Add product to cart
  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <article className="product-card">
      {/* Product image */}
      <Link
        to={`/products/${product.id}`}
        className="product-card-image-link"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
      </Link>

      {/* Product information */}
      <div className="product-card-content">
        <span className="product-card-category">
          {product.category}
        </span>

        <h2 className="product-card-name">
          {product.name}
        </h2>

        {/* Rating */}
        {product.rating !== undefined && (
          <p className="product-card-rating">
            ★ {product.rating}
          </p>
        )}

        {/* Price */}
        <p className="product-card-price">
          {Number(product.price).toLocaleString()} ETB
        </p>

        {/* Actions */}
        <div className="product-card-actions">
          <Link
            to={`/products/${product.id}`}
            className="view-details-button"
          >
            View Details
          </Link>

          <button
            type="button"
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;