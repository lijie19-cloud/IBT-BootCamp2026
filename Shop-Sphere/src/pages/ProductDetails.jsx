import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { loadProducts } from "../api";

import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD PRODUCT
  // ==========================================

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        setError("");

        const products = await loadProducts();

        const foundProduct = products.find((item) => item.id === Number(id));

        if (!foundProduct) {
          throw new Error("Product not found.");
        }

        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="product-details-page">
        <div className="container">
          <p className="status-message">Loading product...</p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="product-details-page">
        <div className="container">
          <p className="error-message">{error}</p>

          <button className="back-button" onClick={() => navigate("/products")}>
            ← Back to Products
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // PRODUCT DETAILS
  // ==========================================

  return (
    <main className="product-details-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate("/products")}>
          ← Back to Products
        </button>

        <section className="product-details">
          {/* PRODUCT IMAGE */}

          <div className="product-details-image">
            <img src={product.image} alt={product.title} />
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="product-details-info">
            <span className="product-category">{product.category}</span>

            <h1>{product.title}</h1>

            <p className="product-rating">⭐ {product.rating}</p>

            <p className="details-price">
              ETB {product.price.toLocaleString()}
            </p>

            <p className="product-description">{product.description}</p>

            <button className="cart-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
