import { dishes } from "../data/dishes";
import DishCard from "./DishCard";

export default function MenuList() {
  return (
    <section className="menu-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </section>
  );
}
