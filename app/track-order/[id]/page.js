"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ORDER_STATUSES = [
  {
    title: "Order received",
    description: "Your order has been recorded.",
    eta: "About 35 minutes remaining",
  },
  {
    title: "Preparing your food",
    description: "Your meal is being prepared.",
    eta: "About 25 minutes remaining",
  },
  {
    title: "Ready for delivery",
    description: "Your food is ready to leave the restaurant.",
    eta: "About 15 minutes remaining",
  },
  {
    title: "Out for delivery",
    description: "Your order is on its way.",
    eta: "About 5 minutes remaining",
  },
  {
    title: "Delivered",
    description: "Your demo order has completed its tracking journey.",
    eta: "Delivery complete",
  },
];

const DELIVERY_LABELS = {
  delivery: "Standard delivery",
  express: "Express delivery",
  pickup: "Restaurant pickup",
};

export default function TrackOrderPage() {
  const params = useParams();
  const id = params.id;

  const [order, setOrder] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("addisEatsOrders") || "[]",
      );

      if (Array.isArray(savedOrders)) {
        setOrder(savedOrders.find((item) => item.id === id) || null);
      }
    } catch {
      setOrder(null);
    } finally {
      setLoaded(true);
    }
  }, [id]);

  function advanceDemoStatus() {
    if (!order) return;

    const currentIndex = ORDER_STATUSES.findIndex(
      (status) => status.title === order.status,
    );

    const safeIndex = currentIndex < 0 ? 0 : currentIndex;

    if (safeIndex >= ORDER_STATUSES.length - 1) {
      setMessage("This demo order has already reached its final status.");
      return;
    }

    const nextStatus = ORDER_STATUSES[safeIndex + 1].title;
    const updatedOrder = { ...order, status: nextStatus };

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("addisEatsOrders") || "[]",
      );

      if (!Array.isArray(savedOrders)) {
        throw new Error("Invalid order storage.");
      }

      const updatedOrders = savedOrders.map((savedOrder) =>
        savedOrder.id === id ? updatedOrder : savedOrder,
      );

      if (!updatedOrders.some((savedOrder) => savedOrder.id === id)) {
        throw new Error("Order not found.");
      }

      localStorage.setItem("addisEatsOrders", JSON.stringify(updatedOrders));

      setOrder(updatedOrder);
      setMessage(`Demo status updated: ${nextStatus}`);
    } catch {
      setMessage(
        "Could not update this demo status. Please check your browser storage.",
      );
    }
  }

  if (!loaded) {
    return (
      <main className="page-container">
        <p>Loading order tracking...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="page-container tracking-page">
        <h1>Order not found</h1>
        <p>
          We could not find this order in this browser. Orders are not shared
          between devices in this prototype.
        </p>
        <Link href="/menu" className="button">
          Browse Menu
        </Link>
      </main>
    );
  }

  const foundIndex = ORDER_STATUSES.findIndex(
    (status) => status.title === order.status,
  );
  const currentIndex = foundIndex < 0 ? 0 : foundIndex;
  const currentStatus = ORDER_STATUSES[currentIndex];
  const progress = (currentIndex / (ORDER_STATUSES.length - 1)) * 100;
  const isComplete = currentIndex === ORDER_STATUSES.length - 1;

  return (
    <main className="page-container tracking-page">
      <div className="page-heading">
        <p className="eyebrow">Your Addis Eats order</p>
        <h1>Track your order</h1>
        <p>Follow the simulated progress of your food order.</p>
      </div>

      <section className="tracking-status-card">
        <div className="tracking-status-header">
          <div>
            <p className="checkout-hint">Order number</p>
            <p className="order-number">{order.id}</p>
          </div>
          <span className="tracking-status-badge">{currentStatus.title}</span>
        </div>

        <h2>{currentStatus.title}</h2>
        <p>{currentStatus.description}</p>

        <div
          className="tracking-progress-track"
          role="progressbar"
          aria-label="Order tracking progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="tracking-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="tracking-eta">{currentStatus.eta}</p>

        <ol className="tracking-timeline">
          {ORDER_STATUSES.map((status, index) => {
            const isDone = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <li
                key={status.title}
                className={[
                  "tracking-step",
                  isDone ? "is-done" : "",
                  isCurrent ? "is-current" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className="tracking-step-marker" aria-hidden="true">
                  {isDone ? "✓" : index + 1}
                </span>
                <div>
                  <strong>{status.title}</strong>
                  <p>{status.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="tracking-demo-notice">
          <strong>Demo tracking</strong>
          <p>
            Statuses are simulated. This page does not receive live restaurant
            updates or GPS information.
          </p>
        </div>

        <button
          type="button"
          className="button tracking-advance-button"
          onClick={advanceDemoStatus}
          disabled={isComplete}
        >
          {isComplete ? "Demo Complete" : "Simulate Next Status"}
        </button>

        {message && (
          <p className="tracking-message" role="status">
            {message}
          </p>
        )}
      </section>

      <section className="tracking-order-card">
        <h2>Order summary</h2>

        <div className="tracking-detail-row">
          <span>Customer</span>
          <strong>{order.customer.name}</strong>
        </div>

        <div className="tracking-detail-row">
          <span>Phone</span>
          <strong>{order.customer.phone}</strong>
        </div>

        <div className="tracking-detail-row">
          <span>Receiving method</span>
          <strong>
            {DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod}
          </strong>
        </div>

        {order.customer.address && (
          <div className="tracking-detail-row">
            <span>Address</span>
            <strong>{order.customer.address}</strong>
          </div>
        )}

        <h3>Items</h3>

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
      </section>

      <div className="confirmation-actions">
        <Link href={`/orders/${order.id}`} className="button button-outline">
          View Confirmation
        </Link>
        <Link href="/menu" className="button">
          Order More Food
        </Link>
      </div>
    </main>
  );
}
