import Dish from "./Dish";

function Menu({ dishes, category }) {
  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === category
        );

  if (filteredDishes.length === 0) {
    return (
      <p className="empty-state">
        No dishes found in this category.
      </p>
    );
  }

  return (
    <section className="menu">
      {filteredDishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
        />
      ))}
    </section>
  );
}

export default Menu;
