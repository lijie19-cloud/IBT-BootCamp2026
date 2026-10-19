"use client";

import { useMemo, useState } from "react";
import DishCard from "./DishCard";
import { dishes } from "../lib/dishes";

const categories = ["All", "Traditional", "Vegetarian", "Breakfast"];

export default function MenuBrowser() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query),
        );

      const matchesCategory = category === "All" || dish.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <div>
      <div className="menu-toolbar">
        <label className="search-field">
          <span>Search dishes</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try Kitfo, lentils, chicken..."
          />
        </label>

        <div className="category-filters" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={`filter-button ${category === item ? "active" : ""}`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="results-count" aria-live="polite">
        {filteredDishes.length}{" "}
        {filteredDishes.length === 1 ? "dish" : "dishes"} found
      </p>

      {filteredDishes.length > 0 ? (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <span aria-hidden="true">AE</span>
          <h2>No dishes found</h2>
          <p>Try another search term or choose a different category.</p>
          <button
            type="button"
            className="button button-primary"
            onClick={resetFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
