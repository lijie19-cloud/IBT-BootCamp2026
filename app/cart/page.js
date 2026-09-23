"use client";

import Link from "next/link";
import { useCart } from "../components/CartProvider";

export default function CartPage() {
  const { cart, subtotal, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-cart-icon">🛒</div>

        <h1>Your Cart Is Empty</h1>

        <p>You haven't added any delicious dishes yet.</p>

        <Link href="/menu" className="primary-button">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-heading">
        <span className="section-label">YOUR ORDER</span>

        <h1>Your Cart 🛒</h1>

        <p>Review your dishes before checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="dish-category">{item.category}</span>

                <h2>{item.name}</h2>

                <p>{item.price.toLocaleString()} ETB each</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <strong>
                  {(item.price * item.quantity).toLocaleString()} ETB
                </strong>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{subtotal.toLocaleString()} ETB</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>

          <hr />

          <Link href="/checkout" className="primary-button checkout-button">
            Proceed to Checkout →
          </Link>

          <Link href="/menu" className="continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
