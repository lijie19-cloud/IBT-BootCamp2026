import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import ContactSellerButton from "@/components/chat/ContactSellerButton";
import ProductActions from "@/components/commerce/ProductActions";
import LocalProductDetails from "@/components/products/LocalProductDetails";
import { getCategories, getProduct, getProductIds, getRelatedProducts } from "@/lib/services/productService";
import { categoryLabel, formatETB } from "@/lib/utils";

export async function generateStaticParams() {
  const ids = await getProductIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return product ? { title: product.name, description: product.description } : { title: "Product not found" };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  const categories = await getCategories();
  if (!product) return <LocalProductDetails productId={id} categories={categories} />;
  if (product.status !== "active") notFound();
  const related = await getRelatedProducts(product);
  const inStock = product.stock > 0;

  return (
    <main className="details-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span aria-current="page">{product.name}</span></nav>
      <section className="product-details">
        <div className="details-image"><Image src={product.image} alt={`${product.name} product illustration`} fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="details-copy">
          <p className="eyebrow">{categoryLabel(product.category, categories)}</p>
          <h1>{product.name}</h1>
          <p className="details-price">{formatETB(product.price)}</p>
          <p className="details-description">{product.description}</p>
          <div className={`availability-card ${inStock ? "" : "unavailable"}`}><span className="status-dot" aria-hidden="true" /><div><strong>{inStock ? "Available" : "Currently unavailable"}</strong><p>{inStock ? `${product.stock} units in this local demo listing.` : "This listing is visible, but cannot be purchased while stock is zero."}</p></div></div>
          <div className="seller-card"><div className="seller-avatar" aria-hidden="true">{product.seller.name.charAt(0)}</div><div><span>Sold by</span><strong>{product.seller.name}</strong><p>{product.seller.location} · Demo seller profile</p></div></div>
          <ProductActions product={product} />
          <ContactSellerButton product={product} />
          <div className="demo-action-note"><strong>Demo commerce only.</strong><p>Cart totals use seeded catalog records. Checkout is simulated and never collects payment.</p></div>
        </div>
      </section>
      {related.length > 0 && <section className="related-section"><div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2>Related products</h2></div><Link className="text-link" href={`/categories/${product.category}`}>View category →</Link></div><ProductGrid products={related} categories={categories} /></section>}
    </main>
  );
}
