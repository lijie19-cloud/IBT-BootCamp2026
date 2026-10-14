"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MapPanel from "./MapPanel";
import { etb, when, relative } from "@/lib/format";
import { toCsv, downloadCsv } from "@/lib/csv";

const steps = [
  "Order received",
  "Preparing",
  "Picked up",
  "On the way",
  "Delivered",
];

function statusIndex(status) {
  return Math.max(0, steps.indexOf(status));
}

export default function TrackingClient({ order }) {
  const [status, setStatus] = useState(order.status);
  const [updatedAt, setUpdatedAt] = useState(order.placedAt);
  const [connection, setConnection] = useState("connecting");
  const [history, setHistory] = useState(order.history);
  const [uploadMessage, setUploadMessage] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const source = new EventSource(
      `/api/orders/${encodeURIComponent(order.id)}/stream`,
    );
    setConnection("connecting");

    source.onopen = () => setConnection("live");
    source.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        setStatus(update.status);
        setUpdatedAt(update.updatedAt);
        setHistory((previous) => {
          if (
            previous.length &&
            previous[previous.length - 1].status === update.status
          )
            return previous;
          return [
            ...previous,
            { time: update.updatedAt, status: update.status },
          ];
        });
        if (update.status === "Delivered") {
          setConnection("delivered");
          source.close();
        }
      } catch {
        setConnection("reconnecting");
      }
    };
    source.onerror = () => {
      if (source.readyState !== EventSource.CLOSED)
        setConnection("reconnecting");
    };
    return () => source.close();
  }, [order.id]);

  function exportHistory() {
    const rows = history.map((item) => ({
      orderId: order.id,
      status: item.status,
      time: when.format(new Date(item.time)),
    }));
    downloadCsv(toCsv(rows), `order-${order.id}-history.csv`);
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    setPreview("");
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setUploadMessage("File must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setUploadMessage("Please select a file with a .csv extension.");
      event.target.value = "";
      return;
    }
    try {
      const text = await file.text();
      if (!text.trim()) {
        setUploadMessage("The CSV file is empty.");
      } else {
        setUploadMessage(
          `Read ${file.name} (${text.length.toLocaleString()} characters). This demo checks the file only; it does not import orders.`,
        );
        setPreview(text.slice(0, 500));
      }
    } catch {
      setUploadMessage(
        "The file could not be read. Please try another CSV file.",
      );
    }
    event.target.value = "";
  }

  const activeStep = statusIndex(status);
  const connectionLabel =
    connection === "live"
      ? "Live connection"
      : connection === "connecting"
        ? "Connecting…"
        : connection === "reconnecting"
          ? "Reconnecting…"
          : "Delivery complete";

  return (
    <main className="tracking-app">
      <header className="dashboard-topbar">
        <Link href="/" className="brand">
          <span className="brand-mark">AE</span>
          <span>
            Addis<span className="brand-accent"> Eats</span>
          </span>
        </Link>
        <div className="dashboard-top-actions">
          <span className="demo-badge">
            <span className="live-dot" /> DEMO TRACKING
          </span>
          <Link href="/" className="back-link">
            ← Home
          </Link>
        </div>
      </header>

      <section className="tracking-heading">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-line" /> YOUR DELIVERY, IN REAL TIME
          </span>
          <h1>
            Track your order<span className="heading-period">.</span>
          </h1>
          <p>Stay up to date from the kitchen to your door.</p>
        </div>
        <div className="order-number">
          <span>ORDER NUMBER</span>
          <strong>{order.id}</strong>
          <span className="order-placed">
            Placed {when.format(new Date(order.placedAt))}
          </span>
        </div>
      </section>

      <section className="status-banner">
        <div className="status-banner-icon">
          {status === "Delivered" ? "✓" : "↗"}
        </div>
        <div className="status-banner-copy">
          <span className="small-label">CURRENT STATUS</span>
          <h2>{status}</h2>
          <p>
            {status === "Delivered"
              ? "Your order has reached its destination."
              : "We’ll keep this page updated as your order progresses."}
          </p>
        </div>
        <div className="status-banner-time">
          <span className="small-label">LAST UPDATE</span>
          <strong>{when.format(new Date(updatedAt))}</strong>
          <span>{relative(updatedAt)}</span>
        </div>
      </section>

      <div className="tracking-layout">
        <section className="panel map-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">LIVE LOCATION</span>
              <h2>Delivery route</h2>
            </div>
            <span className="map-tag">
              <span className="live-dot" /> Map view
            </span>
          </div>
          <MapPanel
            courier={order.courier}
            destination={{ ...order.destination, address: order.address }}
          />
          <div className="location-details">
            <div className="location-row">
              <span className="location-icon restaurant-icon">⌂</span>
              <div>
                <span className="small-label">RESTAURANT</span>
                <strong>{order.restaurant}</strong>
                <p>Bole, Addis Ababa</p>
              </div>
              <span className="location-state">Order origin</span>
            </div>
            <div className="route-line">
              <span />
            </div>
            <div className="location-row">
              <span className="location-icon destination-icon">⌖</span>
              <div>
                <span className="small-label">DELIVERY DESTINATION</span>
                <strong>{order.address}</strong>
                <p>
                  Coordinates: {order.destination.latitude},{" "}
                  {order.destination.longitude}
                </p>
              </div>
              <span className="location-state">Destination</span>
            </div>
          </div>
        </section>

        <aside className="side-column">
          <section className="panel progress-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">ORDER PROGRESS</span>
                <h2>Delivery timeline</h2>
              </div>
              <span className={`connection-pill ${connection}`}>
                <i />
                {connectionLabel}
              </span>
            </div>
            <ol className="timeline">
              {steps.map((step, index) => {
                const completed = index < activeStep || status === "Delivered";
                const current = index === activeStep && status !== "Delivered";
                return (
                  <li
                    className={`timeline-step ${completed ? "completed" : ""} ${current ? "current" : ""}`}
                    key={step}
                  >
                    <span className="timeline-marker">
                      {completed ? "✓" : index + 1}
                    </span>
                    <div className="timeline-copy">
                      <strong>{step}</strong>
                      <span>
                        {completed
                          ? "Completed"
                          : current
                            ? "In progress"
                            : "Waiting"}
                      </span>
                    </div>
                    {current && <span className="current-tag">NOW</span>}
                  </li>
                );
              })}
            </ol>
            <div className="courier-card">
              <div className="courier-avatar">A</div>
              <div>
                <span className="small-label">YOUR COURIER</span>
                <strong>{order.courier.name}</strong>
                <p>Addis Eats delivery partner</p>
              </div>
              <span className="courier-status">
                <i /> Assigned
              </span>
            </div>
          </section>

          <section className="panel summary-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">PAYMENT SUMMARY</span>
                <h2>Order details</h2>
              </div>
              <span className="summary-icon">▤</span>
            </div>
            <div className="summary-row">
              <span>Restaurant</span>
              <strong>{order.restaurant}</strong>
            </div>
            <div className="summary-row">
              <span>Order ID</span>
              <strong>{order.id}</strong>
            </div>
            <div className="summary-row total-row">
              <span>Total paid</span>
              <strong>{etb.format(order.total)}</strong>
            </div>
          </section>

          <section className="panel history-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">ACTIVITY LOG</span>
                <h2>Order history</h2>
              </div>
              <span className="history-count">{history.length} updates</span>
            </div>
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={`${item.status}-${index}`}>
                  <span className="history-bullet" />
                  <div>
                    <strong>{item.status}</strong>
                    <time>{when.format(new Date(item.time))}</time>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="secondary-button full-button"
              type="button"
              onClick={exportHistory}
            >
              <span aria-hidden="true">↓</span> Export history as CSV
            </button>
            <div className="upload-area">
              <label htmlFor="csv-upload">Import a CSV file</label>
              <p>Choose a CSV file up to 2 MB to check it locally.</p>
              <input
                id="csv-upload"
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
              />
              <p className="upload-message" role="status">
                {uploadMessage}
              </p>
              {preview && (
                <details className="csv-preview">
                  <summary>Preview first 500 characters</summary>
                  <pre>{preview}</pre>
                </details>
              )}
            </div>
          </section>
        </aside>
      </div>

      <footer className="dashboard-footer">
        <span>© 2026 Addis Eats</span>
        <span>Delivery updates are simulated for this demonstration.</span>
        <Link href="/">Back to home ↑</Link>
      </footer>
    </main>
  );
}
