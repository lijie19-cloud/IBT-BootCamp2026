"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product, compact = false }) {
  const router = useRouter();
  const { user, isReady: authReady } = useAuth();
  const { addToCart, toggleWishlist, isWishlisted, isReady } = useCart();
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState("");
  const saved = isWishlisted(product.id);

  function requireBuyer() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/products/${product.id}`)}`);
      return false;
    }
    if (user.role !== "buyer") {
      setStatus("Buyer accounts can use the cart and wishlist.");
      return false;
    }
    return true;
  }

  async function handleCart() {
    if (!requireBuyer()) return;
    setPending("cart"); setStatus("");
    const result = await addToCart(product.id);
    setStatus(result.ok ? `${product.name} was added to your cart.` : result.error);
    setPending("");
  }

  async function handleWishlist() {
    if (!requireBuyer()) return;
    setPending("wishlist"); setStatus("");
    const result = await toggleWishlist(product.id);
    setStatus(result.ok ? (result.saved ? "Saved to your wishlist." : "Removed from your wishlist.") : result.error);
    setPending("");
  }

  return <div className={`product-actions ${compact ? "compact-actions" : ""}`}><div><button className="button button-primary" type="button" onClick={handleCart} disabled={!authReady || !isReady || product.stock < 1 || Boolean(pending)}>{pending === "cart" ? "Adding…" : product.stock < 1 ? "Out of stock" : compact ? "Add" : "Add to cart"}</button><button className="button button-secondary wishlist-button" type="button" onClick={handleWishlist} disabled={!authReady || !isReady || Boolean(pending)} aria-pressed={saved}>{pending === "wishlist" ? "Saving…" : saved ? "Saved ♥" : "Save ♡"}</button></div>{status && <p className="action-feedback" role="status">{status}</p>}</div>;
}
