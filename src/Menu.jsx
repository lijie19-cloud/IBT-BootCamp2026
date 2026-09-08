import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { loadDishes } from "./api";
import DishList from "./DishList";

export default function Menu() {
  // ========================================
  // URL SEARCH PARAMETERS
  // ========================================

  const [searchParams, setSearchParams] = useSearchParams();

  // ========================================
  // READ CATEGORY FROM URL
  // ========================================

  const category = searchParams.get("category") || "all";

  // ========================================
  // STATE
  // ========================================

  const [dishes, setDishes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ========================================
  // SEARCH INPUT REFERENCE
  // ========================================

  const searchInputRef = useRef(null);

  // ========================================
  // AUTOFOCUS SEARCH INPUT
  // ========================================

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // ========================================
  // UPDATE PAGE TITLE
  // ========================================

  useEffect(() => {
    if (category === "all") {
      document.title = "Addis Eats - Menu";
    } else {
      document.title = `Addis Eats - ${category} Menu`;
    }
  }, [category]);

  // ========================================
  // LOAD DISHES
  // RUNS WHEN CATEGORY CHANGES
  // ========================================

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      setLoading(true);
      setError("");

      try {
        const data = await loadDishes(category, controller.signal);

        setDishes(data);
      } catch (err) {
        // Ignore aborted requests
        if (err.name === "AbortError") {
          return;
        }

        setError(err.message || "Unable to load the menu.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDishes();

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      controller.abort();
    };
  }, [category]);

  // ========================================
  // CHANGE CATEGORY
  // ========================================

  function handleCategoryChange(newCategory) {
    if (newCategory === "all") {
      // Remove query string
      setSearchParams({});
    } else {
      // Add category to URL
      setSearchParams({
        category: newCategory,
      });
    }
  }

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="menu-page">
        <div className="loading">
          <div className="spinner"></div>

          <p>Loading delicious dishes...</p>
        </div>
      </section>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <section className="menu-page">
        <div className="error">
          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button onClick={() => window.location.reload()} className="btn">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <section className="menu-page">
      {/* ====================================
          MENU HEADER
      ==================================== */}

      <div className="menu-header">
        <p className="section-label">OUR MENU</p>

        <h1>Delicious Ethiopian Dishes</h1>

        <p>Explore our selection of traditional Ethiopian favorites.</p>

        {/* ====================================
            SEARCH INPUT
        ==================================== */}

        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search dishes..."
          aria-label="Search dishes"
          className="search-input"
        />
      </div>

      {/* ====================================
          CATEGORY BUTTONS
      ==================================== */}

      <div className="category-buttons">
        <button
          className={category === "all" ? "active" : ""}
          onClick={() => handleCategoryChange("all")}
        >
          All
        </button>

        <button
          className={category === "Main" ? "active" : ""}
          onClick={() => handleCategoryChange("Main")}
        >
          Main
        </button>

        <button
          className={category === "Vegetarian" ? "active" : ""}
          onClick={() => handleCategoryChange("Vegetarian")}
        >
          Vegetarian
        </button>

        <button
          className={category === "Breakfast" ? "active" : ""}
          onClick={() => handleCategoryChange("Breakfast")}
        >
          Breakfast
        </button>
      </div>

      {/* ====================================
          CURRENT FILTER
      ==================================== */}

      <p className="current-filter">
        Showing: <strong>{category === "all" ? "All dishes" : category}</strong>
      </p>

      {/* ====================================
          DISH LIST
      ==================================== */}

      <DishList dishes={dishes} />
    </section>
  );
}