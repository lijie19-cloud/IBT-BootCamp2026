"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSuccessClient() {
  const [order, setOrder] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setOrder(
        JSON.parse(
          window.localStorage.getItem("addis-eats-last-order") || "null",
        ),
      );
    } catch {
      setOrder(null);
    }
    setReady(true);
  }, []);
  if (!ready)
    return <p className="loading-note">Loading order confirmation…</p>;
  if (!order)
    return (
      <div className="empty-state">
        <span aria-hidden="true">📋</span>
        <h1>No recent order</h1>
        <p>Place a demo order to see a confirmation here.</p>
        <Link href="/menu" className="button button-primary">
          Explore the menu
        </Link>
      </div>
    );
  return (
    <section className="success-card">
      <div className="success-icon" aria-hidden="true">
        ✓
      </div>
      <span className="eyebrow">DEMO ORDER CONFIRMATION</span>
      <h1>Thank you, {order.customer.name}!</h1>
      <p>
        Your demo order has been recorded in this browser. No restaurant has
        been notified and no payment was taken.
      </p>
      <div className="order-reference">
        <span>Reference</span>
        <strong>{order.reference}</strong>
      </div>
      <div className="confirmation-details">
        <div>
          <span>Phone</span>
          <strong>{order.customer.phone}</strong>
        </div>
        <div>
          <span>Delivery address</span>
          <strong>{order.customer.address}</strong>
        </div>
        <div>
          <span>Items</span>
          <strong>
            {order.items.reduce((sum, item) => sum + item.quantity, 0)}
          </strong>
        </div>
      </div>
      <Link href="/menu" className="button button-primary">
        Back to menu
      </Link>
    </section>
  );
}
