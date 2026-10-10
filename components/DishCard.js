import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <Link
        href={`/menu/${dish.id}`}
        className={`dish-art dish-art-${dish.id}`}
        aria-label={`View ${dish.name}`}
      >
        <span className="dish-emoji" aria-hidden="true">
          {dish.emoji}
        </span>
        {dish.popular && <span className="dish-badge">Popular</span>}
      </Link>
      <div className="dish-card-content">
        <div className="dish-meta">
          <span>{dish.category}</span>
          <span className="dish-price">{dish.price} ETB</span>
        </div>
        <h3>
          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
        </h3>
        <p>{dish.summary}</p>
        <div className="dish-actions">
          <Link className="text-link" href={`/menu/${dish.id}`}>
            Details <span aria-hidden="true">→</span>
          </Link>
          <AddToCartButton dish={dish} className="button button-small" />
        </div>
      </div>
    </article>
  );
}
