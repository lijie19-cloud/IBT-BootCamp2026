"use client";

import { useState } from "react";

const CART_KEY = "addis-eats-cart";

export default function AddToCartButton({
  dish,
  className = "button button-primary",
}) {
  const [added, setAdded] = useState(false);

  function addToCart() {
    try {
      const current = JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
      const found = current.find((item) => item.id === dish.id);
      const next = found
        ? current.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current, { id: dish.id, quantity: 1 }];
      window.localStorage.setItem(CART_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("addis-cart-updated"));
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1600);
    } catch {
      alert(
        "Your browser could not save the cart. Please check your browser settings.",
      );
    }
  }

  return (
    <button type="button" className={className} onClick={addToCart}>
      {added ? "Added ✓" : "Add to cart +"}
    </button>
  );
}
