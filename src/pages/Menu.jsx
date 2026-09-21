import { useMemo, useState } from "react";

import Dish from "../components/Dish";
import MenuErrorBoundary from "../components/MenuErrorBoundary";

const dishes = [
  {
    id: 1,
    name: "Kitfo",
    category: "Traditional",
    price: 700,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4T0Vqm1rS0kaAKY2nPrp1dj0HZnCL-2p-y57-XPmzcg&s=10",
    description:
      "Minced beef seasoned with Ethiopian spices and clarified butter.",
  },

  {
    id: 2,
    name: "Shiro Wot",
    category: "Vegetarian",
    price: 280,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcgpmuRVkSuD5PRIMeVKlKZTD8ksLlUb7wUngiYEsMw&s=10",
    description: "A rich Ethiopian chickpea stew prepared with berbere spices.",
  },

  {
    id: 3,
    name: "Vegetarian Firfir",
    category: "Vegetarian",
    price: 550,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKHZRkEMrnUX_mt_RS7QW3PN7HqNkps0VhJxXxX0fGWA&s=10",
    description:
      "Torn injera mixed with flavorful Ethiopian spices and vegetables.",
  },

  {
    id: 4,
    name: "Tibs",
    category: "Traditional",
    price: 1220,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description:
      "Tender pieces of meat sautéed with onions, peppers, and Ethiopian spices.",
  },
];

function Menu() {
  const [category, setCategory] = useState("All");

  const filteredDishes = useMemo(() => {
    if (category === "All") {
      return dishes;
    }

    return dishes.filter((dish) => dish.category === category);
  }, [category]);

  return (
    <section className="menu-page">
      <div className="page-heading">
        <h1>Our Menu</h1>

        <p>Explore authentic Ethiopian dishes.</p>
      </div>

      <div className="category-filters" aria-label="Menu categories">
        {["All", "Traditional", "Vegetarian"].map((item) => (
          <button
            key={item}
            type="button"
            className={
              category === item ? "filter-button active" : "filter-button"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <MenuErrorBoundary>
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      </MenuErrorBoundary>
    </section>
  );
}

export default Menu;
