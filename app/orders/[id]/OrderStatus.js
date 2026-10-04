"use client";

import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ id, initialOrder }) {
  const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initialOrder,
    refreshInterval: 5000,
  });

  if (isLoading && !data) {
    return <div className="loading-message">Loading order...</div>;
  }

  if (error) {
    return <div className="error-message">Could not load the order.</div>;
  }

  if (!data) return null;

  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <span className="section-label">Order</span>

          <h1>#{data.id}</h1>
        </div>

        <div className="live-indicator">
          <span></span>
          LIVE
        </div>
      </div>

      <div className="order-status">
        <span className="status-dot"></span>

        <div>
          <span>Status</span>
          <strong>{data.status}</strong>
        </div>
      </div>

      <div className="order-details">
        <div>
          <span>Customer</span>
          <strong>{data.customer}</strong>
        </div>

        <div>
          <span>Total</span>
          <strong>{data.total} ETB</strong>
        </div>
      </div>

      <div className="polling-message">
        <span>↻</span>
        Order status updates automatically every 5 seconds.
      </div>
    </div>
  );
}
