import { Link } from "react-router-dom";

import Dish from "./Dish";

export default function DishList({ dishes }) {
  // ========================================
  // EMPTY STATE
  // ========================================

  if (dishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  // ========================================
  // DISH GRID
  // ========================================

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <Link key={dish.id} to={`/menu/${dish.id}`} className="dish-link">
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            image={dish.image}
            description={dish.description}
          />
        </Link>
      ))}
    </div>
  );
}
