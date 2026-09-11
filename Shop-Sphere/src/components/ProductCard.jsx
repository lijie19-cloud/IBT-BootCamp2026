import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <h3>{product.title}</h3>

        <p className="product-price">ETB {product.price.toLocaleString()}</p>

        <p className="product-rating">⭐ {product.rating}</p>

        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="details-button">
            View Details
          </Link>

          <button className="cart-button" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
