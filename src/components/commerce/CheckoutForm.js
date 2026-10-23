"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "@/components/auth/AuthGate";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { placeDemoOrder } from "@/lib/services/orderService";
import { formatETB } from "@/lib/utils";

function CheckoutContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, total, isReady, clearCart } = useCart();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const checkoutKey = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    checkoutKey.current ??= `checkout-${crypto.randomUUID?.() ?? Date.now()}`;
    setIsSubmitting(true); setErrors({}); setMessage("");
    const data = new FormData(event.currentTarget);
    const result = await placeDemoOrder(user, cartItems, Object.fromEntries(data), checkoutKey.current);
    if (result.ok) {
      clearCart();
      router.replace(`/orders?confirmed=${encodeURIComponent(result.order.id)}`);
      return;
    }
    setErrors(result.errors || {}); setMessage(result.error || "Review the highlighted fields."); setIsSubmitting(false);
  }

  if (!isReady) return <div className="auth-gate-loading"><span className="spinner" />Checking your cart…</div>;
  if (!cartItems.length) return <div className="checkout-empty"><h2>Your cart is empty.</h2><p>Add a product before starting the simulated checkout.</p><button className="button button-primary" type="button" onClick={() => router.push("/products")}>Browse products</button></div>;

  return <form className="checkout-layout" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}><section className="checkout-form"><div className="demo-checkout-banner"><strong>Simulated checkout</strong><p>No payment details are requested, no money changes hands, and no real order is sent to a seller.</p></div>{message && <p className="form-alert error" role="alert">{message}</p>}<div className="form-grid"><label className="field"><span>Full name</span><input name="fullName" defaultValue={user.fullName} maxLength="80" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "checkout-name-error" : undefined} />{errors.fullName && <small id="checkout-name-error">{errors.fullName}</small>}</label><label className="field"><span>Phone</span><input name="phone" placeholder="+251 911 234 567" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "checkout-phone-error" : undefined} />{errors.phone && <small id="checkout-phone-error">{errors.phone}</small>}</label></div><label className="field"><span>Delivery address</span><input name="address" maxLength="160" placeholder="Street, building, or neighborhood" autoComplete="street-address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "checkout-address-error" : undefined} />{errors.address && <small id="checkout-address-error">{errors.address}</small>}</label><label className="field"><span>City or region</span><input name="city" defaultValue={user.location} maxLength="80" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "checkout-city-error" : undefined} />{errors.city && <small id="checkout-city-error">{errors.city}</small>}</label><button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating demo order…" : "Place simulated order"}</button></section><aside className="order-summary"><p className="eyebrow">Final review</p><h2>{cartItems.length} product{cartItems.length === 1 ? "" : "s"}</h2>{cartItems.map((item) => <div className="checkout-line" key={item.product.id}><span>{item.quantity} × {item.product.name}</span><strong>{formatETB(item.product.price * item.quantity)}</strong></div>)}<div className="checkout-total"><span>Total</span><strong>{formatETB(total)}</strong></div><small>Prices and stock were recalculated from catalog records.</small></aside></form>;
}

export default function CheckoutForm() { return <AuthGate role="buyer"><CheckoutContent /></AuthGate>; }
