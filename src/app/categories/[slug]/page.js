import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import LocalAwareProductGrid from "@/components/products/LocalAwareProductGrid";
import { getCatalog, getCategories, getCategory } from "@/lib/services/productService";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  return category ? { title: category.name, description: category.description } : { title: "Category not found" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const [catalog, allCategories] = await Promise.all([getCatalog({ category: slug }), getCategories()]);

  return (
    <main className="category-page">
      <section className="category-hero"><div className="category-hero-image"><Image src={category.image} alt="" fill priority sizes="(max-width: 520px) 100vw, 210px" /></div><div><p className="eyebrow">Product category</p><h1>{category.name}</h1><p>{category.description}</p><Link className="text-link" href="/products">Browse the complete catalog →</Link></div></section>
      <section className="category-results"><div className="section-heading"><div><p className="eyebrow">Available now</p><h2>Listings in {category.name}</h2></div></div><LocalAwareProductGrid products={catalog.products} categories={allCategories} filters={{ ...catalog.filters, category: slug }} emptyTitle="Nothing here yet" emptyDescription="This category does not have an active demo listing right now." /></section>
    </main>
  );
}
