import Dish from "./Dish";

export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          image={dish.image}
        />
      ))}
    </div>
  );
}