import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { loadClubs, loadEvents, loadResources } from "../api/api";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import ResourceCard from "../components/ResourceCard";

function Home() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHomeData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [clubsData, eventsData, resourcesData] = await Promise.all([
        loadClubs(),
        loadEvents(),
        loadResources(),
      ]);

      setClubs(clubsData);
      setEvents(eventsData);
      setResources(resourcesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  if (loading) {
    return <Loading message="Loading CampusConnect..." />;
  }

if (error) {
  return (
    <section className="page-section">
      <ErrorMessage message={error} onRetry={fetchHomeData} />
    </section>
  );
}

  // Show only a few items on the home page
  const featuredEvents = events.slice(0, 3);
  const popularClubs = clubs.slice(0, 4);
  const quickResources = resources.slice(0, 4);

  return (
    <main className="home-page">
      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">Welcome to CampusConnect</span>

          <h1>
            Connect. Discover.
            <span> Participate. Belong.</span>
          </h1>

          <p>
            Discover campus clubs, exciting events, useful resources, and
            opportunities to connect with your student community.
          </p>

          <div className="hero-actions">
            <Link to="/clubs" className="hero-button">
              Explore Clubs
            </Link>

            <Link to="/events" className="hero-button secondary">
              Discover Events
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          QUICK STATS
      ========================= */}
      <section className="home-stats">
        <div className="stat-card">
          <strong>{clubs.length}</strong>
          <span>Campus Clubs</span>
        </div>

        <div className="stat-card">
          <strong>{events.length}</strong>
          <span>Upcoming Events</span>
        </div>

        <div className="stat-card">
          <strong>{resources.length}</strong>
          <span>Student Resources</span>
        </div>
      </section>

      {/* =========================
          FEATURED EVENTS
      ========================= */}
      <section className="home-section">
        <div className="home-section-header">
          <div>
            <span className="section-label">What's happening</span>

            <h2>Featured Events</h2>

            <p>
              Don't miss exciting activities and opportunities happening on
              campus.
            </p>
          </div>

          <Link to="/events" className="section-link">
            View All Events →
          </Link>
        </div>

        <div className="event-list">
          {featuredEvents.map((event) => (
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
      </section>

      {/* =========================
          POPULAR CLUBS
      ========================= */}
      <section className="home-section">
        <div className="home-section-header">
          <div>
            <span className="section-label">Find your community</span>

            <h2>Popular Clubs</h2>

            <p>Meet students who share your interests and passions.</p>
          </div>

          <Link to="/clubs" className="section-link">
            View All Clubs →
          </Link>
        </div>

        <div className="club-list">
          {popularClubs.map((club) => (
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
      </section>

      {/* =========================
          QUICK RESOURCES
      ========================= */}
      <section className="home-section">
        <div className="home-section-header">
          <div>
            <span className="section-label">Student support</span>

            <h2>Quick Resources</h2>

            <p>
              Access useful academic, career, library, and student support
              services.
            </p>
          </div>

          <Link to="/resources" className="section-link">
            View All Resources →
          </Link>
        </div>

        <div className="resource-list">
          {quickResources.map((resource) => (
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
      </section>

      {/* =========================
          CALL TO ACTION
      ========================= */}
      <section className="home-cta">
        <div>
          <span className="section-label">Get involved</span>

          <h2>Make the most of your campus experience.</h2>

          <p>
            Join a club, attend an event, discover useful resources, and become
            part of the CampusConnect community.
          </p>
        </div>

        <Link to="/clubs" className="hero-button">
          Get Started
        </Link>
      </section>
    </main>
  );
}

export default Home;
