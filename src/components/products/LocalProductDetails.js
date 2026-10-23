"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContactSellerButton from "@/components/chat/ContactSellerButton";
import ProductActions from "@/components/commerce/ProductActions";
import EmptyState from "@/components/ui/EmptyState";
import { findPublicSellerProductById } from "@/lib/repositories/sellerProductRepository";
import { categoryLabel, formatETB } from "@/lib/utils";

export default function LocalProductDetails({ productId, categories }) {
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setProduct(findPublicSellerProductById(productId)),
      0,
    );
    return () => window.clearTimeout(timer);
  }, [productId]);

  if (product === undefined) {
    return <main className="details-page"><div className="auth-gate-loading"><span className="spinner" />Loading listing…</div></main>;
  }

  if (!product) {
    return <main className="details-page"><EmptyState title="Product not found" description="This browser-local listing may have been deactivated, deleted, or created on another device." actionHref="/products" actionLabel="Back to products" /></main>;
  }

  const inStock = product.stock > 0;
  return (
    <main className="details-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span aria-current="page">{product.name}</span></nav>
      <section className="product-details">
        <div className="details-image"><Image src={product.image} alt={`${product.name} product illustration`} fill priority unoptimized={product.image.startsWith("https://")} sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="details-copy">
          <p className="eyebrow">{categoryLabel(product.category, categories)}</p>
          <h1>{product.name}</h1>
          <p className="details-price">{formatETB(product.price)}</p>
          <p className="details-description">{product.description}</p>
          <div className={`availability-card ${inStock ? "" : "unavailable"}`}><span className="status-dot" aria-hidden="true" /><div><strong>{inStock ? "Available" : "Currently unavailable"}</strong><p>{inStock ? `${product.stock} units in this browser-local demo listing.` : "This listing cannot be purchased while stock is zero."}</p></div></div>
          <div className="seller-card"><div className="seller-avatar" aria-hidden="true">{product.seller.name.charAt(0)}</div><div><span>Sold by</span><strong>{product.seller.name}</strong><p>{product.seller.location} · Demo seller profile</p></div></div>
          <ProductActions product={product} />
          <ContactSellerButton product={product} />
          <div className="demo-action-note"><strong>Browser-local demo listing.</strong><p>This product is visible only in this browser. Cart and checkout are simulated and never collect payment.</p></div>
        </div>
      </section>
    </main>
  );
}
