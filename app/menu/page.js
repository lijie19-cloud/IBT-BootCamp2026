import DishCard from "../../components/DishCard";
import { getDishes } from "../lib/dishes";

export const metadata = {
  title: "Menu",
  description:
    "Explore Kitfo, Doro Wat, Tibs, Shiro, and more Ethiopian favorites at Addis Eats.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  const dishes = getDishes();
  return (
    <main className="page-shell container">
      <div className="page-heading">
        <span className="eyebrow">SOMETHING DELICIOUS AWAITS</span>
        <h1>
          Our menu<span>.</span>
        </h1>
        <p>
          Traditional favorites and comforting classics, prepared with Ethiopian
          flavor in every bite.
        </p>
      </div>
      <div className="menu-count">{dishes.length} dishes to discover</div>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </main>
  );
}
