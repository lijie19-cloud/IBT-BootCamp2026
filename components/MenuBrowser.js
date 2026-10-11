"use client";
import { useMemo, useState } from "react";
import useSWR from "swr";
import DishCard from "@/components/DishCard";

const fetcher = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Could not load menu");
    return r.json();
  });
export default function MenuBrowser({ initialDishes }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [debounced, setDebounced] = useState("");
  // Small debounce keeps the API quiet while the user types.
  useMemo(() => {
    const id = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(id);
  }, [query]);
  const { data } = useSWR(
    debounced ? `/api/dishes?q=${encodeURIComponent(debounced)}` : null,
    fetcher,
    { fallbackData: initialDishes, keepPreviousData: true },
  );
  const source = data || initialDishes;
  const filtered = source.filter(
    (dish) =>
      (category === "All" || dish.category === category) &&
      `${dish.name} ${dish.description} ${dish.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const perPage = 6;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const shown = filtered.slice((page - 1) * perPage, page * perPage);
  function changeQuery(value) {
    setQuery(value);
    setPage(1);
  }
  function changeCategory(value) {
    setCategory(value);
    setPage(1);
  }
  return (
    <>
      <div className="toolbar">
        <input
          className="search-input"
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="Search kitfo, shiro, tibs..."
          aria-label="Search dishes"
        />
        <div className="filter-row">
          {["All", "Traditional", "Vegetarian", "Breakfast"].map((item) => (
            <button
              key={item}
              className={`filter-chip ${category === item ? "active" : ""}`}
              onClick={() => changeCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {shown.length ? (
        <div className="dish-grid">
          {shown.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No dishes found</h3>
          <p>Try another search or category.</p>
          <button
            className="btn btn-light"
            onClick={() => {
              changeQuery("");
              changeCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      {filtered.length > perPage && (
        <div className="pagination">
          <button
            className="btn btn-light"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button
            className="btn btn-light"
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
