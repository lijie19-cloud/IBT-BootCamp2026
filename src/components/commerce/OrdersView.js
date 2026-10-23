"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AuthGate from "@/components/auth/AuthGate";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { getDemoOrders } from "@/lib/services/orderService";
import { formatETB } from "@/lib/utils";

function OrdersContent({ confirmed }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);
  useEffect(() => { const task = window.setTimeout(() => setOrders(getDemoOrders(user)), 100); return () => window.clearTimeout(task); }, [user]);
  if (orders === null) return <div className="auth-gate-loading"><span className="spinner" />Loading demo orders…</div>;
  if (!orders.length) return <EmptyState title="No demo orders yet" description="A simulated checkout will appear here. It does not represent a real purchase." actionHref="/products" actionLabel="Browse products" />;
  return <div className="orders-list">{confirmed && <p className="form-alert success" role="status">Demo order {confirmed} was created. No payment was made.</p>}{orders.map((order) => <article key={order.id}><header><div><span>Demo order</span><strong>{order.id}</strong></div><span className="demo-badge">Simulated</span></header><div className="order-products">{order.items.map((item) => <div key={item.productId}><Image src={item.image} alt="" width={52} height={52} /><span><strong>{item.name}</strong><small>{item.quantity} × {formatETB(item.price)}</small></span></div>)}</div><footer><time dateTime={order.createdAt}>{new Intl.DateTimeFormat("en-ET", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.createdAt))}</time><strong>{formatETB(order.total)}</strong></footer></article>)}</div>;
}

export default function OrdersView({ confirmed }) { return <AuthGate role="buyer"><OrdersContent confirmed={confirmed} /></AuthGate>; }
