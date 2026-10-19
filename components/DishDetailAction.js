"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import QuantitySelector from "./QuantitySelector";

export default function DishDetailActions({ dish }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    addToCart(dish, quantity);
    setMessage(`${quantity} × ${dish.name} added to your cart.`);
  }

  return (
    <div className="detail-actions">
      <QuantitySelector quantity={quantity} onChange={setQuantity} />

      <button
        type="button"
        className="button button-primary"
        onClick={handleAddToCart}
      >
        Add {quantity} to Cart
      </button>

      <p role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
