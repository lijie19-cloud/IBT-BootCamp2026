import { useCallback, useEffect, useState } from "react";
import { loadEvents } from "../api/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchEvents = useCallback(async () => {
  try {
    setLoading(true);
    setError("");

    const data = await loadEvents();

    setEvents(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchEvents();
}, [fetchEvents]);
  // Create categories dynamically from event data
  const categories = ["All", ...new Set(events.map((event) => event.category))];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm);

    const matchesCategory = category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <Loading message="Loading events..." />;
  }

if (error) {
  return (
    <section className="page-section">
      <ErrorMessage message={error} onRetry={fetchEvents} />
    </section>
  );
}
  return (
    <section className="page-section">
      {/* Page heading */}
      <div className="page-header">
        <h1>Campus Events</h1>

        <p>
          Discover workshops, competitions, festivals, career opportunities, and
          other exciting campus activities.
        </p>
      </div>

      {/* Search and category filter */}
      <div className="event-controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search events..."
        />

        <div className="category-filter">
          <label htmlFor="event-category">Category</label>

          <select
            id="event-category"
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
          Showing <strong>{filteredEvents.length}</strong> of{" "}
          <strong>{events.length}</strong> events
        </p>
      </div>

      {/* Event list */}
      {filteredEvents.length > 0 ? (
        <div className="event-list">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              image={event.image}
              date={event.date}
              time={event.time}
              location={event.location}
              description={event.description}
              category={event.category}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No events found</h2>

          <p>Try a different search term or category.</p>
        </div>
      )}
    </section>
  );
}

export default Events;
