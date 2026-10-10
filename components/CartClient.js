"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const CART_KEY = "addis-eats-cart";

export default function CartClient({ dishes }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(window.localStorage.getItem(CART_KEY) || "[]"));
    } catch {
      setCart([]);
    }
    setReady(true);
    const sync = () => {
      try {
        setCart(JSON.parse(window.localStorage.getItem(CART_KEY) || "[]"));
      } catch {
        setCart([]);
      }
    };
    window.addEventListener("addis-cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("addis-cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const items = useMemo(
    () =>
      cart
        .map((line) => ({
          ...line,
          dish: dishes.find((dish) => dish.id === line.id),
        }))
        .filter((line) => line.dish),
    [cart, dishes],
  );
  const total = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0,
  );

  function save(next) {
    setCart(next);
    window.localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("addis-cart-updated"));
  }
  function changeQuantity(id, quantity) {
    if (quantity < 1) save(cart.filter((item) => item.id !== id));
    else
      save(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(quantity, 99) } : item,
        ),
      );
  }
  function clearCart() {
    save([]);
  }

  if (!ready) return <p className="loading-note">Loading your cart…</p>;
  if (items.length === 0)
    return (
      <div className="empty-state">
        <span aria-hidden="true">🧺</span>
        <h2>Your cart is waiting</h2>
        <p>Explore the menu and add something delicious.</p>
        <Link href="/menu" className="button button-primary">
          Browse the menu
        </Link>
      </div>
    );

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {items.map(({ dish, quantity }) => (
          <article className="cart-item" key={dish.id}>
            <div
              className={`cart-item-art dish-art-${dish.id}`}
              aria-hidden="true"
            >
              {dish.emoji}
            </div>
            <div className="cart-item-info">
              <h2>{dish.name}</h2>
              <p>{dish.price} ETB each</p>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => changeQuantity(dish.id, quantity - 1)}
                  aria-label={`Decrease ${dish.name} quantity`}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => changeQuantity(dish.id, quantity + 1)}
                  aria-label={`Increase ${dish.name} quantity`}
                >
                  +
                </button>
              </div>
            </div>
            <strong className="cart-line-total">
              {dish.price * quantity} ETB
            </strong>
            <button
              type="button"
              className="remove-button"
              onClick={() => changeQuantity(dish.id, 0)}
              aria-label={`Remove ${dish.name}`}
            >
              Remove
            </button>
          </article>
        ))}
        <button
          className="text-link clear-cart"
          type="button"
          onClick={clearCart}
        >
          Clear cart
        </button>
      </div>
      <aside className="order-summary">
        <h2>Order summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{total} ETB</strong>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>Calculated later</span>
        </div>
        <div className="summary-total">
          <span>Subtotal</span>
          <strong>{total} ETB</strong>
        </div>
        <p className="summary-note">
          Delivery fees, if any, will be confirmed by the restaurant.
        </p>
        <Link href="/checkout" className="button button-primary button-full">
          Continue to checkout →
        </Link>
        <Link href="/menu" className="back-link">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
