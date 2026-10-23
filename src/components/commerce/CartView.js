"use client";

import Image from "next/image";
import Link from "next/link";
import AuthGate from "@/components/auth/AuthGate";
import EmptyState from "@/components/ui/EmptyState";
import { useCart } from "@/context/CartContext";
import { formatETB } from "@/lib/utils";
import { useState } from "react";

function CartContent() {
  const { cartItems, subtotal, total, isReady, updateQuantity } = useCart();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [pendingId, setPendingId] = useState("");

  async function changeQuantity(productId, quantity) {
    if (pendingId) return;
    setPendingId(productId); setStatus({ type: "", message: "" });
    const result = await updateQuantity(productId, quantity);
    setStatus(result.ok ? { type: "success", message: quantity === 0 ? "Item removed from your cart." : "Cart quantity updated." } : { type: "error", message: result.error });
    setPendingId("");
  }
  if (!isReady) return <div className="auth-gate-loading"><span className="spinner" />Loading your cart…</div>;
  if (!cartItems.length) return <EmptyState title="Your cart is empty" description="Explore the catalog and add an available product when you find something you like." actionHref="/products" actionLabel="Browse products" />;

  return <div>{status.message && <p className={`form-alert ${status.type}`} role="status">{status.message}</p>}<div className="cart-layout" aria-busy={Boolean(pendingId)}><section className="cart-items" aria-label="Cart items">{cartItems.map(({ product, quantity }) => <article key={product.id}><Image src={product.image} alt="" width={92} height={92} /><div className="cart-item-copy"><Link href={`/products/${product.id}`}>{product.name}</Link><span>{product.seller.name}</span><strong>{formatETB(product.price)}</strong></div><div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button type="button" onClick={() => changeQuantity(product.id, quantity - 1)} disabled={Boolean(pendingId)} aria-label={`Decrease ${product.name} quantity`}>−</button><span aria-live="polite">{quantity}</span><button type="button" onClick={() => changeQuantity(product.id, quantity + 1)} disabled={Boolean(pendingId) || quantity >= product.stock} aria-label={`Increase ${product.name} quantity`}>+</button></div><button className="remove-link" type="button" onClick={() => changeQuantity(product.id, 0)} disabled={Boolean(pendingId)}>Remove</button></article>)}</section><aside className="order-summary"><p className="eyebrow">Demo summary</p><h2>Order total</h2><dl><div><dt>Items</dt><dd>{formatETB(subtotal)}</dd></div><div><dt>Delivery</dt><dd>Calculated later</dd></div><div className="summary-total"><dt>Total</dt><dd>{formatETB(total)}</dd></div></dl><Link className="button button-primary" href="/checkout">Continue to demo checkout</Link><small>No payment will be collected.</small></aside></div></div>;
}

export default function CartView() { return <AuthGate role="buyer"><CartContent /></AuthGate>; }
