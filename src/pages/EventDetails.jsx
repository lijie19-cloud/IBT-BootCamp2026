import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadEvents } from "../api/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Registration form state
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    studentId: "",
  });

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        setError("");

        const events = await loadEvents();

        const selectedEvent = events.find(
          (event) => String(event.id) === String(id),
        );

        if (!selectedEvent) {
          setError("Event not found.");
          setEvent(null);
          return;
        }

        setEvent(selectedEvent);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Clear messages while the user is editing
    setFormError("");
    setSuccessMessage("");
  }

  // Handle registration
  function handleSubmit(event) {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    const studentName = formData.studentName.trim();
    const email = formData.email.trim();
    const studentId = formData.studentId.trim();

    if (!studentName || !email || !studentId) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (studentId.length < 3) {
      setFormError("Please enter a valid student ID.");
      return;
    }

    setSuccessMessage(`You have successfully registered for ${event.name}!`);

    // Clear the form
    setFormData({
      studentName: "",
      email: "",
      studentId: "",
    });
  }

  if (loading) {
    return <Loading message="Loading event details..." />;
  }

  if (error) {
    return (
      <section className="page-section">
        <ErrorMessage message={error} />

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/events")}
        >
          ← Back to Events
        </button>
      </section>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <section className="page-section">
      {/* Back button */}
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/events")}
      >
        ← Back to Events
      </button>

      {/* Event information */}
      <article className="event-details">
        <div className="event-details-image">
          <img src={event.image} alt={event.name} />
        </div>

        <div className="event-details-content">
          <span className="event-category">{event.category}</span>

          <h1>{event.name}</h1>

          <p className="event-full-description">{event.description}</p>

          <div className="event-details-grid">
            <div className="detail-item">
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>

            <div className="detail-item">
              <span>Time</span>
              <strong>{event.time}</strong>
            </div>

            <div className="detail-item">
              <span>Location</span>
              <strong>{event.location}</strong>
            </div>

            <div className="detail-item">
              <span>Organizer</span>
              <strong>{event.organizer}</strong>
            </div>
          </div>

          {/* Registration information */}
          <div className="registration-info">
            <h2>Registration Information</h2>

            <p>{event.registration}</p>
          </div>

          {/* Requirements */}
          <div className="requirements-section">
            <h2>Requirements</h2>

            {event.requirements && event.requirements.length > 0 ? (
              <ul>
                {event.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            ) : (
              <p>No special requirements are listed for this event.</p>
            )}
          </div>
        </div>
      </article>

      {/* Registration form */}
      <section className="registration-section">
        <div className="registration-header">
          <h2>Register for this Event</h2>

          <p>Complete the form below to register your participation.</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Student name */}
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>

            <input
              id="studentName"
              name="studentName"
              type="text"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
            />
          </div>

          {/* Student ID */}
          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>

            <input
              id="studentId"
              name="studentId"
              type="text"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter your student ID"
            />
          </div>

          {/* Selected event */}
          <div className="form-group">
            <label htmlFor="selectedEvent">Event</label>

            <input id="selectedEvent" type="text" value={event.name} readOnly />
          </div>

          {/* Error */}
          {formError && (
            <div className="form-error" role="alert">
              {formError}
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className="success-message" role="status">
              {successMessage}
            </div>
          )}

          <button type="submit" className="register-button">
            Register for Event
          </button>
        </form>
      </section>
    </section>
  );
}

export default EventDetails;
