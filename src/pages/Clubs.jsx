import { useCallback, useEffect, useState } from "react";

import ClubCard from "../components/ClubCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { loadClubs } from "../api/api";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClubs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await loadClubs();

      setClubs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const categories = ["all", ...new Set(clubs.map((club) => club.category))];

  const filteredClubs = clubs.filter((club) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      club.name.toLowerCase().includes(searchText) ||
      club.description.toLowerCase().includes(searchText);

    const matchesCategory = category === "all" || club.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <Loading message="Loading clubs..." />;
  }

  if (error) {
    return (
      <section className="page-section">
        <ErrorMessage message={error} onRetry={fetchClubs} />
      </section>
    );
  }

  return (
    <main className="page-section">
      <div className="page-header">
        <h1>Campus Clubs</h1>

        <p>
          Discover clubs, meet new people, and participate in campus activities.
        </p>
      </div>

      <div className="club-controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search clubs..."
        />

        <div className="category-filter">
          <label htmlFor="club-category">Category</label>

          <select
            id="club-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="results-count">
        Showing {filteredClubs.length}{" "}
        {filteredClubs.length === 1 ? "club" : "clubs"}
      </p>

      {filteredClubs.length === 0 ? (
        <div className="empty-state">
          <h2>No clubs found</h2>

          <p>Try changing your search or category filter.</p>
        </div>
      ) : (
        <div className="club-list">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} {...club} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Clubs;
