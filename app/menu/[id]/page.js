import Image from "next/image";
import { notFound } from "next/navigation";
import { getDish, dishes } from "@/lib/dishes";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDish(id);
  return dish
    ? {
        title: dish.name,
        description: dish.description,
        openGraph: {
          title: `${dish.name} | Addis Eats`,
          description: dish.description,
          images: [dish.image],
        },
      }
    : {};
}
export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDish(id);
  if (!dish) notFound();
  return (
    <div className="page-shell">
      <div className="container">
        <p>
          <Link className="text-link" href="/menu">
            ← Back to menu
          </Link>
        </p>
        <div className="dish-detail">
          <Image
            className="detail-image"
            src={dish.image}
            alt={dish.name}
            width={1000}
            height={900}
            priority
          />
          <div className="detail-copy">
            <span className="eyebrow">
              {dish.category} · ★ {dish.rating}
            </span>
            <h1>{dish.name}</h1>
            <p>{dish.description}</p>
            <p>
              Prepared fresh and served with the flavors and traditions that
              make Ethiopian food memorable.
            </p>
            <div className="detail-price">{dish.price} ETB</div>
            <p>⏱ Estimated preparation: {dish.time}</p>
            <AddToCartButton dish={dish} />
            <p>
              <small>
                Demo ordering experience. Availability and delivery details are
                illustrative.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
