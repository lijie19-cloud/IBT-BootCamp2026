import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "../../data/dishes";
import AddToCartButton from "../../components/AddToCartButton";

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <section className="dish-detail">
      <Link href="/menu" className="back-link">
        ← Back to Menu
      </Link>

      <div className="dish-detail-card">
        <div className="dish-detail-info">
          <div className="dish-detail-header">
            <span className="dish-category">{dish.category}</span>

            {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
          </div>

          <h1>{dish.name}</h1>

          <p className="dish-detail-description">{dish.description}</p>

          <div className="dish-price">{dish.price.toLocaleString()} ETB</div>

          <AddToCartButton dish={dish} />
        </div>
      </div>
    </section>
  );
}
