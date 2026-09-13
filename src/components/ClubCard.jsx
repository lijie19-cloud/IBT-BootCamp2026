import { Link } from "react-router-dom";

function ClubCard({
  id,
  name,
  description,
  category,
  image,
  meetingDay,
  meetingTime,
  location,
  members,
}) {
  return (
    <article className="club-card">
      <div className="club-image-container">
        <img src={image} alt={`${name} club`} className="club-image" />
      </div>

      <div className="club-card-content">
        <span className="club-category">{category}</span>

        <h2>{name}</h2>

        <p className="club-description">{description}</p>

        <div className="club-info">
          <p>
            <strong>Meeting:</strong> {meetingDay}
          </p>

          <p>
            <strong>Time:</strong> {meetingTime}
          </p>

          <p>
            <strong>Location:</strong> {location}
          </p>

          <p>
            <strong>Members:</strong> {members}
          </p>
        </div>

        <Link to={`/clubs/${id}`} className="details-button">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ClubCard;
