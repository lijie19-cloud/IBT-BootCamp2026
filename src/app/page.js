import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/products/ProductGrid";
import {
  getCategories,
  getFeaturedProducts,
  getRecentProducts,
} from "@/lib/services/productService";

export default async function Home() {
  const [categories, featured, recent] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getRecentProducts(),
  ]);

  return (
    <main>
      <section className="market-hero" id="top">
        <div className="market-hero-copy">
          <p className="eyebrow">Independent sellers. Thoughtful finds.</p>
          <h1>Find something worth keeping.</h1>
          <p>
            Explore useful products from local demo sellers, with clear prices,
            stock information, and the story behind every listing.
          </p>
          <form
            className="hero-search"
            action="/products"
            method="get"
            role="search"
          >
            <label className="sr-only" htmlFor="home-search">
              Search the marketplace
            </label>
            <input
              id="home-search"
              name="query"
              type="search"
              placeholder="What are you looking for?"
              maxLength="80"
            />
            <button className="button button-primary" type="submit">
              Search products
            </button>
          </form>
          <div className="hero-trust">
            <span>Prices in ETB</span>
            <span>Local demo catalog</span>
            <span>No payment required</span>
          </div>
        </div>
        <div className="hero-showcase" aria-label="Marketplace highlights">
          <div className="showcase-card showcase-main">
            <span>Curated catalog</span>
            <strong>{featured.length}+ featured finds</strong>
            <p>Clear details from independent demo sellers.</p>
          </div>
          <div className="showcase-card showcase-small">
            <span>Fresh this week</span>
            <strong>{recent.length} new arrivals</strong>
          </div>
          <div className="showcase-orbit" aria-hidden="true">
            M
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse your way</p>
            <h2>Shop by category</h2>
          </div>
          <Link className="text-link" href="/products">
            View all products →
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              className="category-card"
              href={`/categories/${category.slug}`}
              key={category.slug}
            >
              <span className="category-card-image">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 520px) 100vw, (max-width: 1000px) 50vw, 20vw"
                />
              </span>
              <div className="category-card-copy">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <b aria-hidden="true">→</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Seller favorites</p>
            <h2>Featured products</h2>
          </div>
          <Button href="/products" variant="secondary">
            Browse catalog
          </Button>
        </div>
        <ProductGrid products={featured} categories={categories} />
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Just listed</p>
            <h2>Recently added</h2>
          </div>
        </div>
        <ProductGrid products={recent} categories={categories} />
      </section>

      <section className="seller-cta">
        <div>
          <p className="eyebrow">Built for independent sellers</p>
          <h2>Your products deserve a better storefront.</h2>
          <p>
            Create a demo seller account, publish browser-local listings, and
            manage products and buyer messages from one responsive workspace.
          </p>
        </div>
        <Button href="/signup">Register as a seller</Button>
      </section>
    </main>
  );
}
