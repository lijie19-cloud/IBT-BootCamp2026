import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "../../../lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <article className="dish-details">
      <span className="dish-category">{dish.category}</span>

      <h1>{dish.name}</h1>

      <p className="dish-description">{dish.description}</p>

      <div className="dish-price">{dish.price} ETB</div>

      <div className="dish-actions">
        <Link href="/menu" className="btn btn-secondary">
          ← Back to Menu
        </Link>

        <Link href="/cart" className="btn btn-primary">
          Go to Cart
        </Link>
      </div>
    </article>
  );
}
