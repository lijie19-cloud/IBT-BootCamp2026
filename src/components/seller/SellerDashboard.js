"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AuthGate from "@/components/auth/AuthGate";
import { useAuth } from "@/context/AuthContext";
import { getSellerListings } from "@/lib/services/sellerProductService";
import { formatETB } from "@/lib/utils";

function DashboardContent() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("loading");

  const loadListings = useCallback(async () => {
    setStatus("loading");
    try { setListings(await getSellerListings(user)); setStatus("ready"); }
    catch { setStatus("error"); }
  }, [user]);

  useEffect(() => {
    const task = window.setTimeout(loadListings, 0);
    return () => window.clearTimeout(task);
  }, [loadListings]);

  if (status === "loading") return <div className="auth-gate-loading"><span className="spinner" />Loading seller dashboard…</div>;
  if (status === "error") return <div className="empty-state"><h2>Dashboard unavailable</h2><p>Your local demo listings could not be read.</p><button className="button button-primary" onClick={loadListings}>Retry</button></div>;

  const active = listings.filter((item) => item.status === "active").length;
  const inactive = listings.length - active;
  const inventoryValue = listings.reduce((total, item) => total + item.price * item.stock, 0);
  return <div className="seller-dashboard"><div className="seller-page-heading"><div><p className="eyebrow">Seller dashboard</p><h1>Good to see you, {user.fullName.split(" ")[0]}.</h1><p>Manage listings saved only in this browser. Other users and devices cannot see these demo changes.</p></div><Link className="button button-primary" href="/seller/products/new">+ Add product</Link></div><div className="dashboard-stats"><article><span>Total products</span><strong>{listings.length}</strong><p>Browser-local listings</p></article><article><span>Active</span><strong>{active}</strong><p>Visible status in this workspace</p></article><article><span>Inactive</span><strong>{inactive}</strong><p>Paused listings</p></article><article><span>Inventory value</span><strong>{formatETB(inventoryValue)}</strong><p>Sample calculation, not sales</p></article></div><section className="dashboard-section"><div className="section-heading"><div><p className="eyebrow">Recent activity</p><h2>Your latest listings</h2></div><Link className="text-link" href="/seller/products">Manage all →</Link></div>{listings.length ? <div className="activity-list">{listings.slice(0, 4).map((product) => <article key={product.id}><div><strong>{product.name}</strong><span>{product.status} · {product.stock} in stock</span></div><span>{formatETB(product.price)}</span><Link href={`/seller/products/${product.id}/edit`}>Edit</Link></article>)}</div> : <div className="empty-state compact-empty"><h2>No listings yet</h2><p>Create your first browser-local product listing.</p><Link className="button button-primary" href="/seller/products/new">Add product</Link></div>}</section><aside className="sample-stat-note"><strong>Sample statistics only</strong><p>No orders, payments, revenue, or real customer activity are connected in this milestone.</p></aside></div>;
}

export default function SellerDashboard() { return <AuthGate role="seller"><DashboardContent /></AuthGate>; }
