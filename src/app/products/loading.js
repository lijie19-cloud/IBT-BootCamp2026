import LoadingState from "@/components/ui/LoadingState";

export default function ProductsLoading() {
  return <main className="catalog-page"><section className="page-intro"><p className="eyebrow">The marketplace</p><h1>Loading the catalog…</h1></section><LoadingState /></main>;
}
