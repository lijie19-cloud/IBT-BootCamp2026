"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ProductFilters({ categories, initialFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const firstSearchRender = useRef(true);
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialFilters.query);

  function navigate(updates) {
    const params = new URLSearchParams();
    const next = { ...initialFilters, ...updates, page: 1 };
    Object.entries(next).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined && !(key === "sort" && value === "newest") && !(key === "page" && value === 1)) params.set(key, value);
    });
    startTransition(() => router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false }));
  }

  useEffect(() => {
    if (firstSearchRender.current) {
      firstSearchRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => navigate({ query }), 350);
    return () => window.clearTimeout(timer);
  // navigate intentionally depends on the current server-provided filter snapshot.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function submitPrices(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    navigate({ minPrice: data.get("minPrice"), maxPrice: data.get("maxPrice") });
  }

  return (
    <aside className="filters-panel" aria-label="Product filters">
      <div className="filter-heading"><div><p className="eyebrow">Refine results</p><h2>Find your match</h2></div><span className="filter-status" aria-live="polite">{isPending ? "Updating…" : "Ready"}</span></div>
      <div className="filter-grid">
        <label className="field search-field"><span>Search products</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Coffee, basket, headphones…" maxLength="80" /></label>
        <label className="field"><span>Category</span><select value={initialFilters.category} onChange={(event) => navigate({ category: event.target.value })}><option value="">All categories</option>{categories.map((category) => <option value={category.slug} key={category.slug}>{category.name}</option>)}</select></label>
        <label className="field"><span>Sort by</span><select value={initialFilters.sort} onChange={(event) => navigate({ sort: event.target.value })}><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label>
      </div>
      <form className="price-form" onSubmit={submitPrices}>
        <label className="field"><span>Minimum ETB</span><input name="minPrice" inputMode="decimal" type="number" min="0" defaultValue={initialFilters.minPrice ?? ""} placeholder="0" /></label>
        <label className="field"><span>Maximum ETB</span><input name="maxPrice" inputMode="decimal" type="number" min="0" defaultValue={initialFilters.maxPrice ?? ""} placeholder="Any" /></label>
        <button className="button button-secondary filter-button" type="submit" disabled={isPending}>Apply price</button>
      </form>
    </aside>
  );
}
