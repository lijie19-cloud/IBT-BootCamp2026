import { useState } from "react";
import menu from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const categories = ["All", ...new Set(menu.map((dish) => dish.category))];

  const filteredDishes =
    selectedCategory === "All"
      ? menu
      : menu.filter((dish) => dish.category === selectedCategory);

  function handleAdd(price) {
    setTotal((currentTotal) => currentTotal + price);
  }

  return (
    <main>
      <h1>Addis Eats Menu</h1>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <DishList dishes={filteredDishes} onAdd={handleAdd} />

      <div className="order-total">
        <h2>Order Total: {total.toFixed(2)} ETB</h2>
      </div>

      <OrderForm total={total} />
    </main>
  );
}
