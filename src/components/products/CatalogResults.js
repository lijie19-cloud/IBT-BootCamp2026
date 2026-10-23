"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import LocalAwareProductGrid from "./LocalAwareProductGrid";

function pageHref(filters, page) {
  const params = new URLSearchParams();
  Object.entries({ ...filters, page }).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined && !(key === "sort" && value === "newest") && !(key === "page" && value === 1)) params.set(key, value);
  });
  return `/products${params.size ? `?${params}` : ""}`;
}

export default function CatalogResults({ catalog, categories }) {
  const { products, filters, pagination } = catalog;
  const [localCount, setLocalCount] = useState(0);
  const updateLocalCount = useCallback((count) => setLocalCount(count), []);
  const totalItems = pagination.totalItems + localCount;

  return (
    <section className="catalog-results" aria-labelledby="results-heading">
      <div className="results-heading"><div><p className="eyebrow">Catalog</p><h2 id="results-heading">{totalItems} {totalItems === 1 ? "product" : "products"}</h2></div><p>Page {pagination.currentPage} of {pagination.totalPages}</p></div>
      <LocalAwareProductGrid products={products} categories={categories} filters={filters} onLocalCountChange={updateLocalCount} />
      {pagination.totalPages > 1 && <nav className="pagination" aria-label="Product pages">
        {pagination.currentPage > 1 ? <Link className="button button-secondary" href={pageHref(filters, pagination.currentPage - 1)}>← Previous</Link> : <span />}
        <span>{pagination.currentPage} / {pagination.totalPages}</span>
        {pagination.currentPage < pagination.totalPages ? <Link className="button button-secondary" href={pageHref(filters, pagination.currentPage + 1)}>Next →</Link> : <span />}
      </nav>}
    </section>
  );
}
