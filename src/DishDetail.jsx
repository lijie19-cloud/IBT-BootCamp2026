import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getCart, saveCart } from "./cart";

export default function DishDetail() {
  // ========================================
  // READ ID FROM URL
  // ========================================

  const { id } = useParams();

  // ========================================
  // STATE
  // ========================================

  const [dish, setDish] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [added, setAdded] = useState(false);

  // ========================================
  // FETCH DISH
  // ========================================

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDish() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/dishes.json", {
          signal: controller.signal,
        });

        // ====================================
        // CHECK RESPONSE
        // ====================================

        if (!response.ok) {
          throw new Error(
            `Failed to load dish. Server returned ${response.status}.`,
          );
        }

        // ====================================
        // READ JSON
        // ====================================

        const dishes = await response.json();

        // ====================================
        // FIND DISH
        // ====================================

        const foundDish = dishes.find((item) => String(item.id) === String(id));

        // ====================================
        // DISH NOT FOUND
        // ====================================

        if (!foundDish) {
          throw new Error("Dish not found.");
        }

        setDish(foundDish);

        // ====================================
        // PAGE TITLE
        // ====================================

        document.title = `Addis Eats - ${foundDish.name}`;
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        setError(err.message || "Unable to load dish.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDish();

    return () => {
      controller.abort();
    };
  }, [id]);

  // ========================================
  // ADD TO CART
  // ========================================

  function addToCart() {
    const cart = getCart();

    const existing = cart.find((item) => item.id === dish.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...dish,
        quantity: 1,
      });
    }

    saveCart(cart);

    setAdded(true);

    // Hide message
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="dish-detail-page">
        <div className="loading">
          <div className="spinner"></div>

          <p>Loading dish...</p>
        </div>
      </section>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <section className="dish-detail-page">
        <div className="error">
          <h2>Dish unavailable</h2>

          <p>{error}</p>

          <Link to="/menu" className="btn">
            ← Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  // ========================================
  // DISH DETAIL
  // ========================================

  return (
    <section className="dish-detail-page">
      {/* ====================================
          BACK LINK
      ==================================== */}

      <Link to="/menu" className="back-link">
        ← Back to Menu
      </Link>

      {/* ====================================
          DETAIL CARD
      ==================================== */}

      <div className="dish-detail-card">
        {/* IMAGE */}

        <div className="dish-detail-image">
          <img src={dish.image} alt={dish.name} />
        </div>

        {/* CONTENT */}

        <div className="dish-detail-content">
          <p className="section-label">{dish.category}</p>

          <h1>{dish.name}</h1>

          <p className="dish-detail-description">{dish.description}</p>

          <p className="dish-detail-price">{dish.price.toLocaleString()} ETB</p>

          {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}

          {/* ==================================
              ADD TO CART
          ================================== */}

          <button className="btn" onClick={addToCart}>
            Add to Cart
          </button>

          {/* ==================================
              SUCCESS MESSAGE
          ================================== */}

          {added && <p className="success-message">✓ Added to cart!</p>}

          {/* ==================================
              VIEW CART
          ================================== */}

          <Link to="/checkout" className="view-cart-link">
            Go to Checkout →
          </Link>
        </div>
      </div>
    </section>
  );
}