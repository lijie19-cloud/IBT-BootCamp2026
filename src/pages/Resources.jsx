import { useEffect, useState } from "react";
import { loadResources } from "../api/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ResourceCard from "../components/ResourceCard";
import SearchBar from "../components/SearchBar";

function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResources() {
      try {
        setLoading(true);
        setError("");

        const data = await loadResources();

        setResources(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  // Create categories from the resource data
  const categories = [
    "All",
    ...new Set(resources.map((resource) => resource.category)),
  ];

  // Filter resources
  const filteredResources = resources.filter((resource) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "All" || resource.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <Loading message="Loading resources..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="page-section">
      {/* Page heading */}
      <div className="page-header">
        <h1>Student Resources</h1>

        <p>
          Find useful academic, career, library, and student support resources
          to help you succeed on campus.
        </p>
      </div>

      {/* Search and category controls */}
      <div className="resource-controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search resources..."
        />

        <div className="category-filter">
          <label htmlFor="resource-category">Category</label>

          <select
            id="resource-category"
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
          Showing <strong>{filteredResources.length}</strong> of{" "}
          <strong>{resources.length}</strong> resources
        </p>
      </div>

      {/* Resource cards */}
      {filteredResources.length > 0 ? (
        <div className="resource-list">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              category={resource.category}
              description={resource.description}
              icon={resource.icon}
              link={resource.link}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No resources found</h2>

          <p>Try a different search term or category.</p>
        </div>
      )}
    </section>
  );
}

export default Resources;
