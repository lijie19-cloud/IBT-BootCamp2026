import { useState } from "react";

import Dish from "../components/Dish";

const dishes = [
  {
    id: 1,
    name: "Kitfo",
    price: 700,
    category: "Traditional",
    description:
      "Minced beef seasoned with Ethiopian spices and clarified butter.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4T0Vqm1rS0kaAKY2nPrp1dj0HZnCL-2p-y57-XPmzcg&s=10",
  },
  {
    id: 2,
    name: "Shiro Wot",
    price: 280,
    category: "Vegetarian",
    description: "Delicious chickpea stew prepared with traditional spices.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcgpmuRVkSuD5PRIMeVKlKZTD8ksLlUb7wUngiYEsMw&s=10",
  },
  {
    id: 3,
    name: "Vegetarian Firfir",
    price: 550,
    category: "Vegetarian",
    description:
      "Shredded injera mixed with spicy berbere sauce and vegetables.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKHZRkEMrnUX_mt_RS7QW3PN7HqNkps0VhJxXxX0fGWA&s=10",
  },
  {
    id: 4,
    name: "Tibs",
    price: 1220,
    category: "Traditional",
    description:
      "Tender pieces of meat sautéed with onions, peppers and spices.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
];

function Menu() {
  const [category, setCategory] = useState("All");

  const categories = ["All", "Traditional", "Vegetarian"];

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section className="menu-page">
      <div className="page-heading">
        <span className="section-label">Our Menu</span>

        <h1>Delicious Ethiopian Dishes</h1>

        <p>Choose from our selection of traditional dishes.</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item ? "filter-button active" : "filter-button"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Dishes */}
      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <div className="empty-state">
          <h2>No dishes found</h2>
          <p>Try another category.</p>
        </div>
      )}
    </section>
  );
}

export default Menu;
