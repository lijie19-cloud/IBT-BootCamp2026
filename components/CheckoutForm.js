"use client";
import { useEffect, useMemo, useState } from "react";
import { placeOrderAction } from "@/app/checkout/actions";
export default function CheckoutForm() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("addis-eats-cart") || "[]"));
    } catch {
      setCart([]);
    }
    setReady(true);
  }, []);
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  if (!ready) return <div className="panel">Loading checkout…</div>;
  if (!cart.length)
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Add something from the menu before checkout.</p>
        <a className="btn btn-primary" href="/menu">
          Browse menu
        </a>
      </div>
    );
  return (
    <div className="checkout-layout">
      <form
        className="panel"
        action={async (formData) => {
          formData.set(
            "items",
            JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity }))),
          );
          await placeOrderAction(formData);
        }}
      >
        <h2>Delivery details</h2>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={30}
            autoComplete="tel"
            placeholder="09xxxxxxxx"
          />
        </div>
        <div className="field">
          <label htmlFor="address">Delivery address</label>
          <textarea
            id="address"
            name="address"
            required
            maxLength={250}
            autoComplete="street-address"
            placeholder="Sub-city, area, building or delivery notes"
          />
        </div>
        <div className="notice">
          Demo checkout: this project does not collect card details or process
          real payments.
        </div>
        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          type="submit"
        >
          Place order · {total} ETB
        </button>
      </form>
      <aside className="panel">
        <h2>Order summary</h2>
        {cart.map((item) => (
          <div className="summary-row" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <strong>{item.price * item.quantity} ETB</strong>
          </div>
        ))}
        <div className="summary-row total">
          <span>Total</span>
          <span>{total} ETB</span>
        </div>
      </aside>
    </div>
  );
}
