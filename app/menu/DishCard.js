"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../components/CartProvider";

export default function DishCard({ dish }) {
  const { addToCart } = useCart();

  const [message, setMessage] = useState("");

  function handleAddToCart() {
    addToCart(dish);

    setMessage(`${dish.name} added to your cart!`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  return (
    <article className="dish-card">
      <div className="dish-card-content">
        {/* Category and spicy badge */}
        <div className="dish-card-top">
          <span className="dish-category">{dish.category}</span>

          {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
        </div>

        {/* Dish information */}
        <h2>{dish.name}</h2>

        <p>{dish.description}</p>

        {/* Price */}
        <div className="dish-card-price">{dish.price.toLocaleString()} ETB</div>

        {/* Actions */}
        <div className="dish-card-actions">
          <Link href={`/menu/${dish.id}`} className="view-button">
            View Dish →
          </Link>

          <button
            type="button"
            className="primary-button"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>
        </div>

        {/* Success message */}
        {message && <p className="success-message">✓ {message}</p>}
      </div>
    </article>
  );
}
