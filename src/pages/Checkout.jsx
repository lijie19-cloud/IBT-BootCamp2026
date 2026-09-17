import { useState } from "react";

import useAuth from "../hooks/useAuth";
import useCartStore from "../store/cartStore";

function Checkout() {
  const { user } = useAuth();

  // Narrow selector.
  const items = useCartStore((state) => state.items);

  // Narrow selector.
  const clear = useCartStore((state) => state.clear);

  const [success, setSuccess] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = (event) => {
    event.preventDefault();

    setSuccess(true);

    // Clear cart after successful order.
    clear();
  };

  if (success) {
    return (
      <section className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <h1>Order Successfully Placed!</h1>

          <p>Thank you, {user?.name}. Your order has been received.</p>

          <p>We will contact you using your registered information.</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h1>No Items to Checkout</h1>

        <p>Your cart is currently empty.</p>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="page-heading">
        <h1>Checkout</h1>

        <p>Complete your order.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleCheckout}>
          <h2>Customer Information</h2>

          <div className="form-group">
            <label htmlFor="customerName">Name</label>

            <input
              id="customerName"
              type="text"
              value={user?.name || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerEmail">Email</label>

            <input
              id="customerEmail"
              type="email"
              value={user?.email || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>

            <input id="phone" type="tel" placeholder="09xxxxxxxx" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>

            <textarea
              id="address"
              rows="4"
              placeholder="Enter your delivery address"
              required
            />
          </div>

          <button type="submit" className="primary-button full-width">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Your Order</h2>

          {items.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>{item.price * item.quantity} ETB</strong>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>

            <strong>{total} ETB</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
