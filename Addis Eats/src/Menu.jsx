import { useEffect, useRef, useState } from "react";

import { loadDishes } from "./api";
import DishList from "./DishList";

export default function Menu() {
  const [category, setCategory] = useState("all");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchInputRef = useRef(null);

  // Automatically focus the search field
  // when the component first loads.
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Load dishes whenever category changes.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      setLoading(true);
      setError("");

      try {
        const data = await loadDishes(category, controller.signal);

        setDishes(data);
      } catch (err) {
        // Ignore aborted requests.
        if (err.name === "AbortError") {
          return;
        }

        setError(err.message || "Something went wrong while loading the menu.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDishes();

    // Cancel the previous request
    // when category changes or component unmounts.
    return () => {
      controller.abort();
    };
  }, [category]);

  // Loading state
  if (loading) {
    return (
      <section className="menu">
        <div className="menu-title">
          <p className="eyebrow">ADDIS EATS</p>
          <h2>Our Menu</h2>
        </div>

        <div className="status-message">
          <span className="loader"></span>
          <p>Loading dishes...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="menu">
        <div className="menu-title">
          <p className="eyebrow">ADDIS EATS</p>
          <h2>Our Menu</h2>
        </div>

        <div className="error-message">
          <h3>Unable to load the menu</h3>

          <p>{error}</p>

          <button type="button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="menu">
      <div className="menu-header">
        <div className="menu-title">
          <p className="eyebrow">ADDIS EATS</p>

          <h2>Our Menu</h2>

          <p>
            Discover delicious Ethiopian dishes prepared with traditional
            flavors.
          </p>
        </div>

        <div className="search-container">
          <label htmlFor="search">Search dishes</label>

          <input
            ref={searchInputRef}
            id="search"
            type="search"
            placeholder="Search dishes..."
          />
        </div>
      </div>

      <div className="category-section">
        <h3>Categories</h3>

        <div className="category-filter">
          <button
            type="button"
            className={category === "all" ? "active" : ""}
            onClick={() => setCategory("all")}
          >
            All
          </button>

          <button
            type="button"
            className={category === "Main" ? "active" : ""}
            onClick={() => setCategory("Main")}
          >
            Main
          </button>

          <button
            type="button"
            className={category === "Vegetarian" ? "active" : ""}
            onClick={() => setCategory("Vegetarian")}
          >
            Vegetarian
          </button>

          <button
            type="button"
            className={category === "Breakfast" ? "active" : ""}
            onClick={() => setCategory("Breakfast")}
          >
            Breakfast
          </button>
        </div>
      </div>

      <DishList dishes={dishes} />
    </section>
  );
}