import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../components/AddToCartButton";
import { getDish, getDishes } from "../../lib/dishes";

export function generateStaticParams() {
  return getDishes().map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "Dish Not Found" };
  return {
    title: dish.name,
    description: dish.summary,
    alternates: { canonical: `/menu/${dish.id}` },
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.summary,
      type: "website",
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="container detail-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/menu">Menu</Link>
        <span>/</span>
        <span>{dish.name}</span>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="detail-grid">
        <div className={`detail-art dish-art-${dish.id}`}>
          <span aria-hidden="true">{dish.emoji}</span>
          <div className="detail-art-caption">Made with Ethiopian flavor</div>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{dish.category}</span>
          <h1>
            {dish.name}
            <span>.</span>
          </h1>
          <div className="detail-price">
            {dish.price} <small>ETB</small>
          </div>
          <p className="detail-summary">{dish.summary}</p>
          <p>{dish.details}</p>
          <div className="detail-benefit">
            <span>✦</span> Prepared with care and inspired by tradition.
          </div>
          <AddToCartButton
            dish={dish}
            className="button button-primary detail-add"
          />
          <Link href="/menu" className="back-link">
            ← Back to menu
          </Link>
        </div>
      </div>
    </main>
  );
}
