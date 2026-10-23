"use client";

import { useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import ProductGrid from "./ProductGrid";
import { findPublicSellerProducts } from "@/lib/repositories/sellerProductRepository";

function matchesFilters(product, filters) {
  if (filters.category && product.category !== filters.category) return false;
  if (filters.minPrice !== null && product.price < filters.minPrice) return false;
  if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;
  const query = String(filters.query || "").toLowerCase();
  if (!query) return true;
  return `${product.name} ${product.description} ${product.seller.name}`
    .toLowerCase()
    .includes(query);
}

function sortProducts(products, sort) {
  return [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

export default function LocalAwareProductGrid({
  products,
  categories,
  filters = {},
  emptyTitle = "No products found",
  emptyDescription = "Try a broader search, another category, or a different price range.",
  onLocalCountChange,
}) {
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    const load = () => setLocalProducts(findPublicSellerProducts());
    load();
    window.addEventListener("storage", load);
    window.addEventListener("markethub-products-changed", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("markethub-products-changed", load);
    };
  }, []);

  const matchingLocalProducts = useMemo(
    () => sortProducts(localProducts.filter((product) => matchesFilters(product, filters)), filters.sort),
    [filters, localProducts],
  );

  useEffect(() => {
    onLocalCountChange?.(matchingLocalProducts.length);
  }, [matchingLocalProducts.length, onLocalCountChange]);

  const merged = useMemo(() => {
    const seen = new Set(matchingLocalProducts.map((product) => product.id));
    return [...matchingLocalProducts, ...products.filter((product) => !seen.has(product.id))];
  }, [matchingLocalProducts, products]);

  return merged.length ? (
    <>
      {matchingLocalProducts.length > 0 && (
        <p className="demo-catalog-note" role="status">
          Seller-created listings from this browser are shown first. They are not shared with other devices.
        </p>
      )}
      <ProductGrid products={merged} categories={categories} />
    </>
  ) : (
    <EmptyState title={emptyTitle} description={emptyDescription} />
  );
}
