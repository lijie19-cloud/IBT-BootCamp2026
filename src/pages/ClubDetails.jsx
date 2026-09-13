import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadClubs } from "../api/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function ClubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    async function fetchClub() {
      try {
        setLoading(true);
        setError("");

        const clubs = await loadClubs();

        const selectedClub = clubs.find(
          (club) => String(club.id) === String(id),
        );

        if (!selectedClub) {
          setError("Club not found.");
          setClub(null);
          return;
        }

        setClub(selectedClub);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchClub();
  }, [id]);

  if (loading) {
    return <Loading message="Loading club details..." />;
  }

  if (error) {
    return (
      <section className="page-section">
        <ErrorMessage message={error} />

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/clubs")}
        >
          ← Back to Clubs
        </button>
      </section>
    );
  }

  if (!club) {
    return null;
  }

  function handleJoin() {
    setJoined((current) => !current);
  }

  return (
    <section className="page-section">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/clubs")}
      >
        ← Back to Clubs
      </button>

      <article className="club-details">
        <div className="club-details-image">
          <img src={club.image} alt={`${club.name} club`} />
        </div>

        <div className="club-details-content">
          <span className="club-category">{club.category}</span>

          <h1>{club.name}</h1>

          <p className="club-details-description">{club.description}</p>

          <div className="club-details-grid">
            <div className="detail-item">
              <span>Meeting Day</span>
              <strong>{club.meetingDay}</strong>
            </div>

            <div className="detail-item">
              <span>Meeting Time</span>
              <strong>{club.meetingTime}</strong>
            </div>

            <div className="detail-item">
              <span>Location</span>
              <strong>{club.location}</strong>
            </div>

            <div className="detail-item">
              <span>Members</span>
              <strong>{club.members}</strong>
            </div>
          </div>

          <div className="interests-section">
            <h2>Club Interests</h2>

            <div className="interest-list">
              {club.interests.map((interest) => (
                <span key={interest} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="club-actions">
            <button
              type="button"
              className={`join-button ${joined ? "joined" : ""}`}
              onClick={handleJoin}
            >
              {joined ? "✓ Joined Club" : "Join Club"}
            </button>

            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/clubs")}
            >
              Back to Clubs
            </button>
          </div>

          {joined && (
            <div className="success-message" role="status">
              You have successfully joined <strong>{club.name}</strong>!
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

export default ClubDetails;
