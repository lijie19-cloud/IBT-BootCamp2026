import ProductFilters from "@/components/products/ProductFilters";
import CatalogResults from "@/components/products/CatalogResults";
import { getCatalog, getCategories } from "@/lib/services/productService";

export const metadata = { title: "Browse products", description: "Search and filter products from independent MarketHub sellers." };

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const [catalog, categories] = await Promise.all([getCatalog(params), getCategories()]);
  const { filters } = catalog;

  return (
    <main className="catalog-page">
      <section className="page-intro"><p className="eyebrow">The marketplace</p><h1>Useful things, sold by real people.</h1><p>Browse a curated demo catalog priced in Ethiopian birr. Listings are seeded locally and do not represent live inventory.</p></section>
      <ProductFilters categories={categories} initialFilters={filters} />
      <CatalogResults catalog={catalog} categories={categories} />
    </main>
  );
}
