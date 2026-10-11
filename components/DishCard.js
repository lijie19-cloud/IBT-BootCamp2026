import Image from "next/image";
import Link from "next/link";
export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <Link href={`/menu/${dish.id}`} aria-label={`View ${dish.name}`}>
        <div className="dish-image-wrap">
          <Image
            className="dish-image"
            src={dish.image}
            alt={dish.name}
            width={600}
            height={420}
          />
          <span className="dish-tag">{dish.tag}</span>
        </div>
        <div className="dish-content">
          <div className="dish-meta">
            <span>★ {dish.rating}</span>
            <span>{dish.time}</span>
          </div>
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <div className="dish-bottom">
            <span className="price">
              {dish.price} <small>ETB</small>
            </span>
            <span className="round-add" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
