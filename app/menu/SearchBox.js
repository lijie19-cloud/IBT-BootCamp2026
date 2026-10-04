"use client";

import { useState } from "react";
import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "./useDebounce";

export default function SearchBox() {
  const [term, setTerm] = useState("");

  const debouncedTerm = useDebounce(term, 300);

  const key = debouncedTerm
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}`
    : "/api/dishes";

  const { data, error, isLoading } = useSWR(key, fetcher, {
    keepPreviousData: true,
  });

  return (
    <section className="search-section">
      <div className="search-header">
        <span className="section-label">Find Your Favorite</span>

        <h2>Search the Menu</h2>

        <p>Search for delicious Ethiopian dishes.</p>
      </div>

      <div className="search-wrapper">
        <span className="search-icon">⌕</span>

        <input
          id="search"
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search dishes..."
        />

        {term && (
          <button
            className="clear-search"
            onClick={() => setTerm("")}
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {error && <div className="error-message">Could not load dishes.</div>}

      {isLoading && !data && (
        <div className="loading-message">Loading dishes...</div>
      )}

      {data && (
        <div className="dish-grid search-results">
          {Array.isArray(data) &&
            data.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}

      {Array.isArray(data) && data.length === 0 && (
        <div className="empty-state">
          <span>🍽️</span>
          <h3>No dishes found</h3>
          <p>Try searching for another dish.</p>
        </div>
      )}
    </section>
  );
}

function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <div className="dish-card-top">
        <div className="dish-icon">🍛</div>

        <span className="category-badge">{dish.category}</span>
      </div>

      <h3>{dish.name}</h3>

      <p>{dish.description}</p>

      <div className="dish-bottom">
        <strong>{dish.price} ETB</strong>
      </div>
    </article>
  );
}
