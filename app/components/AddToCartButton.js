"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ dish }) {
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
    <div className="add-cart-wrapper">
      <button
        type="button"
        className="primary-button"
        onClick={handleAddToCart}
      >
        🛒 Add to Cart
      </button>

      {message && <p className="success-message">✓ {message}</p>}
    </div>
  );
}
