"use client";

import AuthGate from "@/components/auth/AuthGate";
import EmptyState from "@/components/ui/EmptyState";
import ProductCard from "@/components/products/ProductCard";
import { useCart } from "@/context/CartContext";

function WishlistContent({ categories }) {
  const { wishlist, isReady } = useCart();
  if (!isReady) return <div className="auth-gate-loading"><span className="spinner" />Loading saved products…</div>;
  if (!wishlist.length) return <EmptyState title="Nothing saved yet" description="Use the Save button on a product to keep it here for later." actionHref="/products" actionLabel="Explore products" />;
  return <div className="product-grid">{wishlist.map((product) => <ProductCard product={product} categories={categories} key={product.id} />)}</div>;
}

export default function WishlistView({ categories }) { return <AuthGate role="buyer"><WishlistContent categories={categories} /></AuthGate>; }
