import { useEffect, useState } from "react";
import { loadClubs } from "../api/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ClubCard from "../components/ClubCard";
import SearchBar from "../components/SearchBar";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClubs() {
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
    }

    fetchClubs();
  }, []);

  // Create category list from the clubs data
  const categories = ["All", ...new Set(clubs.map((club) => club.category))];

  // Filter clubs according to search and category
  const filteredClubs = clubs.filter((club) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm) ||
      club.description.toLowerCase().includes(searchTerm) ||
      club.category.toLowerCase().includes(searchTerm);

    const matchesCategory = category === "All" || club.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <Loading message="Loading clubs..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Campus Clubs</h1>

        <p>
          Discover student communities, develop new skills, and connect with
          people who share your interests.
        </p>
      </div>

      {/* Search and filtering controls */}
      <div className="club-controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search clubs..."
        />

        <div className="category-filter">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>
          Showing <strong>{filteredClubs.length}</strong> of{" "}
          <strong>{clubs.length}</strong> clubs
        </p>
      </div>

      {/* Club list */}
      {filteredClubs.length > 0 ? (
        <div className="club-list">
          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              id={club.id}
              name={club.name}
              description={club.description}
              category={club.category}
              image={club.image}
              meetingDay={club.meetingDay}
              meetingTime={club.meetingTime}
              location={club.location}
              members={club.members}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No clubs found</h2>

          <p>Try a different search term or category.</p>
        </div>
      )}
    </section>
  );
}

export default Clubs;
