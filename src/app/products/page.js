import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { getCatalog, getCategories } from "@/lib/services/productService";

export const metadata = { title: "Browse products", description: "Search and filter products from independent MarketHub sellers." };

function pageHref(filters, page) {
  const params = new URLSearchParams();
  Object.entries({ ...filters, page }).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined && !(key === "sort" && value === "newest") && !(key === "page" && value === 1)) params.set(key, value);
  });
  return `/products${params.size ? `?${params}` : ""}`;
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const [catalog, categories] = await Promise.all([getCatalog(params), getCategories()]);
  const { products, filters, pagination } = catalog;

  return (
    <main className="catalog-page">
      <section className="page-intro"><p className="eyebrow">The marketplace</p><h1>Useful things, sold by real people.</h1><p>Browse a curated demo catalog priced in Ethiopian birr. Listings are seeded locally and do not represent live inventory.</p></section>
      <ProductFilters categories={categories} initialFilters={filters} />
      <section className="catalog-results" aria-labelledby="results-heading">
        <div className="results-heading"><div><p className="eyebrow">Catalog</p><h2 id="results-heading">{pagination.totalItems} {pagination.totalItems === 1 ? "product" : "products"}</h2></div><p>Page {pagination.currentPage} of {pagination.totalPages}</p></div>
        {products.length ? <ProductGrid products={products} categories={categories} /> : <EmptyState title="No products found" description="Try a broader search, another category, or a different price range." />}
        {pagination.totalPages > 1 && <nav className="pagination" aria-label="Product pages">
          {pagination.currentPage > 1 ? <Link className="button button-secondary" href={pageHref(filters, pagination.currentPage - 1)}>← Previous</Link> : <span />}
          <span>{pagination.currentPage} / {pagination.totalPages}</span>
          {pagination.currentPage < pagination.totalPages ? <Link className="button button-secondary" href={pageHref(filters, pagination.currentPage + 1)}>Next →</Link> : <span />}
        </nav>}
      </section>
    </main>
  );
}
