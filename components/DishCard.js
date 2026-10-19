"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "../lib/dishes";
import { useCart } from "./CartProvider";

export default function DishCard({ dish }) {
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    addToCart(dish, 1);
    setMessage(`${dish.name} added to your cart.`);
  }

  return (
    <article className="dish-card">
      <Link
        href={`/menu/${dish.id}`}
        className="dish-image-link"
        aria-label={`View ${dish.name} details`}
      >
        <div className="menu-dish-image">
          <img src={dish.image} alt={dish.name} loading="lazy" />

          {dish.popular && <span className="popular-badge">Popular</span>}
        </div>
      </Link>

      <div className="dish-info">
        <div className="dish-meta">
          <span className="dish-category">{dish.category}</span>
          <span className="dish-rating">★ {dish.rating}</span>
        </div>

        <h2>
          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
        </h2>

        <p>{dish.description}</p>

        <div className="dish-card-footer">
          <span className="dish-price">{formatPrice(dish.price)}</span>

          <Link href={`/menu/${dish.id}`} className="button button-outline">
            Details
          </Link>

          <button
            type="button"
            className="button button-primary"
            onClick={handleAddToCart}
          >
            + Add to Cart
          </button>
        </div>

        <p className="cart-feedback" role="status" aria-live="polite">
          {message}
        </p>
      </div>
    </article>
  );
}
