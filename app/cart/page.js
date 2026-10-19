"use client";

import Link from "next/link";
import { useCart } from "../../components/CartProvider";
import CartItem from "../../components/CartItem";
import { formatPrice } from "../../lib/dishes";

export default function CartPage() {
  const { items, subtotal, itemCount, isHydrated, clearCart } = useCart();

  function handleClearCart() {
    const confirmed = window.confirm(
      "Are you sure you want to remove all items from your cart?",
    );

    if (confirmed) {
      clearCart();
    }
  }

  if (!isHydrated) {
    return (
      <section className="container section" aria-live="polite">
        <h1>Loading your cart...</h1>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container section empty-cart">
        <div className="empty-cart-icon" aria-hidden="true">
          🛒
        </div>

        <span className="eyebrow">YOUR SHOPPING CART</span>
        <h1>Your cart is empty</h1>
        <p>
          You haven't added any dishes yet. Explore our menu and discover
          something delicious.
        </p>

        <Link href="/menu" className="button button-primary">
          Explore the Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="container cart-section">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">YOUR ORDER</span>
          <h1>Shopping Cart</h1>
          <p>
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <button
          type="button"
          className="remove-button"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <Link href="/menu" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-total">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <Link
            href="/checkout"
            className="button button-primary checkout-button"
          >
            Proceed to Checkout →
          </Link>

          <p className="summary-note">
            Delivery fees and final totals will be calculated in the checkout
            phase.
          </p>
        </aside>
      </div>
    </section>
  );
}
