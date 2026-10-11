"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function CartClient() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        setCart(JSON.parse(localStorage.getItem("addis-eats-cart") || "[]"));
      } catch {
        setCart([]);
      }
      setReady(true);
    };
    read();
    window.addEventListener("addis-cart-updated", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("addis-cart-updated", read);
      window.removeEventListener("storage", read);
    };
  }, []);
  function save(next) {
    setCart(next);
    localStorage.setItem("addis-eats-cart", JSON.stringify(next));
    window.dispatchEvent(new Event("addis-cart-updated"));
  }
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  if (!ready) return <div className="panel">Loading your cart…</div>;
  if (!cart.length)
    return (
      <div className="empty-state">
        <h2>Your cart is waiting</h2>
        <p>Discover something delicious from our menu.</p>
        <Link className="btn btn-primary" href="/menu">
          Explore menu
        </Link>
      </div>
    );
  return (
    <div className="cart-layout">
      <section className="panel">
        <h2>Your items ({cart.reduce((n, i) => n + i.quantity, 0)})</h2>
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <Image src={item.image} alt={item.name} width={100} height={90} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} ETB each</p>
              <button
                className="remove"
                onClick={() => save(cart.filter((i) => i.id !== item.id))}
              >
                Remove
              </button>
            </div>
            <div>
              <div className="qty-control">
                <button
                  aria-label={`Decrease ${item.name}`}
                  onClick={() =>
                    save(
                      cart.map((i) =>
                        i.id === item.id
                          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
                          : i,
                      ),
                    )
                  }
                >
                  −
                </button>
                <strong>{item.quantity}</strong>
                <button
                  aria-label={`Increase ${item.name}`}
                  onClick={() =>
                    save(
                      cart.map((i) =>
                        i.id === item.id
                          ? { ...i, quantity: Math.min(20, i.quantity + 1) }
                          : i,
                      ),
                    )
                  }
                >
                  +
                </button>
              </div>
              <strong>{item.price * item.quantity} ETB</strong>
            </div>
          </div>
        ))}
      </section>
      <aside className="panel">
        <h2>Order summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{total} ETB</strong>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{total} ETB + delivery</span>
        </div>
        <Link
          href="/checkout"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 12 }}
        >
          Continue to checkout ↗
        </Link>
        <p className="muted" style={{ fontSize: ".8rem" }}>
          Demo only. No real payment is collected.
        </p>
      </aside>
    </div>
  );
}
