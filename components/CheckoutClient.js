"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CART_KEY = "addis-eats-cart";
const ORDER_KEY = "addis-eats-last-order";

export default function CheckoutClient() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setCart(JSON.parse(window.localStorage.getItem(CART_KEY) || "[]"));
    } catch {
      setCart([]);
    }
    setReady(true);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!cart.length) {
      setError("Your cart is empty. Please add a dish before checkout.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get("name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      address: String(form.get("address") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
    };
    if (!customer.name || !customer.phone || !customer.address) {
      setError(
        "Please complete your name, phone number, and delivery address.",
      );
      return;
    }
    const order = {
      reference: `AE-${Date.now().toString().slice(-7)}`,
      customer,
      items: cart,
      createdAt: new Date().toISOString(),
      status: "Demo order received",
    };
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    window.localStorage.removeItem(CART_KEY);
    window.location.href = "/order-success";
  }

  if (!ready) return <p className="loading-note">Loading checkout…</p>;
  if (!cart.length)
    return (
      <div className="empty-state">
        <span aria-hidden="true">🛍️</span>
        <h2>Your cart is empty</h2>
        <p>Add a dish before continuing to checkout.</p>
        <Link href="/menu" className="button button-primary">
          Browse the menu
        </Link>
      </div>
    );

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Delivery details</h2>
        <p className="form-intro">
          All fields marked required must be completed.
        </p>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label htmlFor="name">
          Full name <span>*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
        />
        <label htmlFor="phone">
          Phone number <span>*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={30}
          placeholder="e.g. 09xxxxxxxx"
        />
        <label htmlFor="address">
          Delivery address <span>*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows="3"
          autoComplete="street-address"
          required
          maxLength={500}
          placeholder="Area, street, building, or helpful directions"
        />
        <label htmlFor="notes">
          Order notes <span className="optional">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="2"
          maxLength={500}
          placeholder="Any useful delivery instructions"
        />
        <button className="button button-primary button-full" type="submit">
          Place order →
        </button>
        <p className="demo-disclaimer">
          Demo only: this form does not send your order to a restaurant or
          process a payment.
        </p>
      </form>
      <aside className="order-summary">
        <h2>Next step</h2>
        <p>
          Your order details will be saved in this browser.
        </p>
        <Link href="/cart" className="back-link">
          ← Return to cart
        </Link>
      </aside>
    </div>
  );
}
