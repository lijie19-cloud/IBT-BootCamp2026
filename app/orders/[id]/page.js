"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderConfirmationPage() {
  const params = useParams();
  const id = params.id;

  const [order, setOrder] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("addisEatsOrders") || "[]");

      if (Array.isArray(saved)) {
        setOrder(saved.find((item) => item.id === id) || null);
      }
    } catch {
      setOrder(null);
    } finally {
      setLoaded(true);
    }
  }, [id]);

  if (!loaded) {
    return (
      <main className="page-container">
        <p>Loading your order...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="page-container confirmation-page">
        <h1>Order not found</h1>
        <p>
          This order is not saved in this browser. It may have been cleared or
          created on a different device.
        </p>
        <Link href="/menu" className="button">
          Browse Menu
        </Link>
      </main>
    );
  }

  const deliveryLabels = {
    delivery: "Standard delivery",
    express: "Express delivery",
    pickup: "Restaurant pickup",
  };

  const paymentLabels = {
    cash: "Cash on delivery / pickup",
    telebirr: "Telebirr (demo)",
    "cbe-birr": "CBE Birr (demo)",
  };

  return (
    <main className="page-container confirmation-page">
      <div className="confirmation-icon" aria-hidden="true">
        ✓
      </div>
      <p className="eyebrow">Thank you for choosing Addis Eats</p>
      <h1>Order received!</h1>
      <p className="confirmation-intro">
        Your demo order has been created successfully.
      </p>

      <section className="confirmation-card">
        <p className="checkout-hint">Order number</p>
        <p className="order-number">{order.id}</p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Customer:</strong> {order.customer.name}
        </p>
        <p>
          <strong>Phone:</strong> {order.customer.phone}
        </p>
        <p>
          <strong>Receiving method:</strong>{" "}
          {deliveryLabels[order.deliveryMethod] || order.deliveryMethod}
        </p>

        {order.customer.address && (
          <p>
            <strong>Address:</strong> {order.customer.address}
          </p>
        )}

        <p>
          <strong>Payment:</strong>{" "}
          {paymentLabels[order.paymentMethod] || order.paymentMethod}
        </p>

        <h2>Your items</h2>
        {order.items.map((item) => (
          <div className="summary-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <p>Quantity: {item.quantity}</p>
            </div>
            <span>{item.lineTotal} ETB</span>
          </div>
        ))}

        <div className="summary-row">
          <span>Subtotal</span>
          <span>{order.subtotal} ETB</span>
        </div>
        <div className="summary-row">
          <span>Delivery fee</span>
          <span>
            {order.deliveryFee === 0 ? "Free" : `${order.deliveryFee} ETB`}
          </span>
        </div>
        <div className="summary-row summary-total">
          <strong>Total</strong>
          <strong>{order.total} ETB</strong>
        </div>

        {order.customer.notes && (
          <p>
            <strong>Your notes:</strong> {order.customer.notes}
          </p>
        )}

        <p className="checkout-hint">
          This is a simulated order. No payment was processed and the restaurant
          has not been notified.
        </p>
      </section>

      <div className="confirmation-actions">
        <Link href={`/track-order/${order.id}`} className="button">
          Track Order
        </Link>
        <Link href="/menu" className="button button-outline">
          Order More Food
        </Link>
      </div>
    </main>
  );
}
