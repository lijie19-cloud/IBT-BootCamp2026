import { Link } from "react-router-dom";

function EventCard({
  id,
  name,
  image,
  date,
  time,
  location,
  description,
  category,
}) {
  return (
    <article className="event-card">
      <div className="event-image-container">
        <img src={image} alt={name} className="event-image" />
      </div>

      <div className="event-card-content">
        <span className="event-category">{category}</span>

        <h2>{name}</h2>

        <div className="event-date">
          <strong>{date}</strong>
        </div>

        <div className="event-info">
          <p>
            <strong>Time:</strong> {time}
          </p>

          <p>
            <strong>Location:</strong> {location}
          </p>
        </div>

        <p className="event-description">{description}</p>

        <Link to={`/events/${id}`} className="details-button">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
