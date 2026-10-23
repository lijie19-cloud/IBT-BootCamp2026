"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AuthGate from "@/components/auth/AuthGate";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { getSellerListings, removeSellerListing, setSellerListingStatus } from "@/lib/services/sellerProductService";
import { formatETB } from "@/lib/utils";

function ProductsContent() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [pendingId, setPendingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => { setStatus("loading"); try { setListings(await getSellerListings(user)); setStatus("ready"); } catch { setStatus("error"); } }, [user]);
  useEffect(() => {
    const task = window.setTimeout(load, 0);
    return () => window.clearTimeout(task);
  }, [load]);

  async function toggleStatus(product) {
    setPendingId(product.id); setMessage("");
    try { await setSellerListingStatus(user, product.id, product.status === "active" ? "inactive" : "active"); await load(); setMessage(`${product.name} is now ${product.status === "active" ? "inactive" : "active"}.`); }
    catch (error) { setMessage(error.message); }
    finally { setPendingId(null); }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setPendingId(deleteTarget.id);
    try { const deleted = await removeSellerListing(user, deleteTarget.id); setDeleteTarget(null); await load(); setMessage(`${deleted.name} was deleted from this browser.`); }
    catch (error) { setMessage(error.message); }
    finally { setPendingId(null); }
  }

  if (status === "loading") return <div className="auth-gate-loading"><span className="spinner" />Loading products…</div>;
  if (status === "error") return <div className="empty-state"><h2>Listings unavailable</h2><p>We could not read your browser-local listings.</p><button className="button button-primary" onClick={load}>Retry</button></div>;

  return <div><div className="seller-page-heading"><div><p className="eyebrow">Product management</p><h1>Your listings</h1><p>Edit, activate, pause, or remove products owned by this demo seller account.</p></div><Link className="button button-primary" href="/seller/products/new">+ Add product</Link></div>{message && <p className="form-alert success" role="status">{message}</p>}{listings.length ? <div className="seller-product-list">{listings.map((product) => <article key={product.id}><div className="seller-product-image"><Image src={product.image} alt="" fill sizes="96px" unoptimized={product.image.startsWith("https://")} /></div><div className="seller-product-info"><div className="listing-title-line"><h2>{product.name}</h2><span className={`listing-status ${product.status}`}>{product.status}</span></div><p>{formatETB(product.price)} · {product.stock} in stock</p><small>Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(product.updatedAt || product.createdAt))}</small></div><div className="listing-actions"><Link className="button button-secondary" href={`/seller/products/${product.id}/edit`}>Edit</Link><button className="button button-secondary" type="button" disabled={pendingId === product.id} onClick={() => toggleStatus(product)}>{product.status === "active" ? "Deactivate" : "Activate"}</button><button className="button danger-button" type="button" disabled={pendingId === product.id} onClick={() => setDeleteTarget(product)}>Delete</button></div></article>)}</div> : <div className="empty-state"><h2>No products yet</h2><p>Add your first product to this browser-local seller workspace.</p><Link className="button button-primary" href="/seller/products/new">Create listing</Link></div>}<Modal isOpen={Boolean(deleteTarget)} title="Delete this listing?" onClose={() => setDeleteTarget(null)} actions={<><button className="button button-secondary" type="button" onClick={() => setDeleteTarget(null)}>Cancel</button><button className="button danger-button" type="button" autoFocus onClick={confirmDelete} disabled={pendingId === deleteTarget?.id}>{pendingId ? "Deleting…" : "Delete permanently"}</button></>}><p><strong>{deleteTarget?.name}</strong> will be removed from this browser. This cannot be undone.</p></Modal></div>;
}

export default function SellerProductsManager() { return <AuthGate role="seller"><ProductsContent /></AuthGate>; }
