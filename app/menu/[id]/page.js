import Link from "next/link";
import { notFound } from "next/navigation";
import QuantitySelector from "../../../components/QuantitySelector";
import { dishes, getDishById, formatPrice } from "../../../lib/dishes";
import DishDetailActions from "../../../components/DishDetailActions";

export function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return { title: "Dish Not Found | Addis Eats" };
  }

  return {
    title: `${dish.name} | Addis Eats`,
    description: dish.description,
  };
}

export default async function DishDetailsPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <section className="container detail-section">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/menu">Menu</Link>
        <span>/</span>
        <span aria-current="page">{dish.name}</span>
      </nav>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={dish.image} alt={dish.name} />
        </div>

        <div className="detail-content">
          <span className="eyebrow">{dish.category}</span>
          <h1>{dish.name}</h1>

          <p className="detail-rating">
            ★ {dish.rating} <span>Customer rating (demo)</span>
          </p>

          <p className="detail-description">{dish.description}</p>

          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {dish.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>

          <p className="detail-price">{formatPrice(dish.price)}</p>

          <QuantitySelector />

          <p className="cart-phase-note">
            Quantity selection is ready. Shared cart and Add to Cart
            functionality will be connected in Phase 3.
          </p>

          <Link href="/menu" className="button button-primary">
            ← Back to Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
