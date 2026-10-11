"use client";
import useSWR from "swr";
const fetcher = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Could not refresh status");
    return r.json();
  });
export default function OrderStatus({ orderId, initialOrder }) {
  const { data } = useSWR(`/api/orders/${orderId}/status`, fetcher, {
    fallbackData: initialOrder,
    refreshInterval: 5000,
  });
  const status = data?.status || initialOrder.status;
  const stages = [
    "Received",
    "Preparing",
    "Ready",
    "Out for delivery",
    "Delivered",
  ];
  const current = stages.indexOf(status);
  return (
    <section className="panel">
      <h2>Order status</h2>
      <span className="status-pill">{status}</span>
      <div className="steps">
        {stages.map((stage, i) => (
          <div className={`step ${current >= i ? "done" : ""}`} key={stage}>
            {stage}
          </div>
        ))}
      </div>
      <p className="muted">
        Status refreshes automatically about every 5 seconds.
      </p>
    </section>
  );
}
