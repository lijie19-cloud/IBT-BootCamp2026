import { useCallback, useEffect, useState } from "react";

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

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    studentId: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  /* =========================================
     FETCH EVENT
  ========================================= */

  const fetchEvent = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  /* =========================================
     HANDLE INPUT CHANGES
  ========================================= */

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Remove the error for the field
    // while the user is correcting it.
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    // Remove old success message
    // when the user starts another registration.
    setSuccessMessage("");
  }

  /* =========================================
     VALIDATE FORM
  ========================================= */

  function validateForm() {
    const errors = {};

    const name = formData.studentName.trim();
    const email = formData.email.trim();
    const studentId = formData.studentId.trim();

    /* ---------- STUDENT NAME ---------- */

    if (!name) {
      errors.studentName = "Student name is required.";
    } else if (name.length < 2) {
      errors.studentName = "Student name must contain at least 2 characters.";
    } else if (name.length > 50) {
      errors.studentName = "Student name must not exceed 50 characters.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(name)) {
      errors.studentName =
        "Student name can only contain letters, spaces, apostrophes, and hyphens.";
    }

    /* ---------- EMAIL ---------- */

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email address is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    /* ---------- STUDENT ID ---------- */

    const studentIdPattern = /^[A-Za-z0-9-]+$/;

    if (!studentId) {
      errors.studentId = "Student ID is required.";
    } else if (studentId.length < 3) {
      errors.studentId = "Student ID must contain at least 3 characters.";
    } else if (studentId.length > 20) {
      errors.studentId = "Student ID must not exceed 20 characters.";
    } else if (!studentIdPattern.test(studentId)) {
      errors.studentId =
        "Student ID can only contain letters, numbers, and hyphens.";
    }

    return errors;
  }

  /* =========================================
     HANDLE FORM SUBMISSION
  ========================================= */

  function handleSubmit(event) {
    event.preventDefault();

    setSuccessMessage("");

    const errors = validateForm();

    setFormErrors(errors);

    // Stop submission if validation fails.
    if (Object.keys(errors).length > 0) {
      return;
    }

    /* =======================================
       SUCCESS
    ======================================= */

    setSuccessMessage(
      `Registration successful! You are registered for "${eventDataName()}".`,
    );

    // Reset form after successful submission.
    setFormData({
      studentName: "",
      email: "",
      studentId: "",
    });

    setFormErrors({});

    // Move focus to success message.
    setTimeout(() => {
      document.getElementById("registration-success")?.focus();
    }, 0);
  }

  /* =========================================
     GET EVENT NAME SAFELY
  ========================================= */

  function eventDataName() {
    return event?.name || "this event";
  }

  /* =========================================
     LOADING STATE
  ========================================= */

  if (loading) {
    return <Loading message="Loading event details..." />;
  }

  /* =========================================
     ERROR STATE
  ========================================= */

  if (error) {
    return (
      <section className="page-section">
        <ErrorMessage message={error} onRetry={fetchEvent} />

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

  /* =========================================
     RENDER EVENT DETAILS
  ========================================= */

  return (
    <main className="page-section">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/events")}
      >
        ← Back to Events
      </button>

      <article className="event-details">
        {/* =====================================
            EVENT IMAGE
        ===================================== */}

        <div className="event-details-image">
          <img src={event.image} alt={event.name} />
        </div>

        {/* =====================================
            EVENT INFORMATION
        ===================================== */}

        <div className="event-details-content">
          <span className="event-category">{event.category}</span>

          <h1>{event.name}</h1>

          <p className="event-details-description">{event.description}</p>

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

          {/* =====================================
              REGISTRATION INFORMATION
          ===================================== */}

          <section className="registration-info">
            <h2>Registration Information</h2>

            <p>
              <strong>Registration:</strong> {event.registration}
            </p>

            <h3>Requirements</h3>

            <ul>
              {event.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </section>

          {/* =====================================
              REGISTRATION FORM
          ===================================== */}

          <section className="registration-section">
            <div className="registration-header">
              <h2>Register for This Event</h2>

              <p>Complete the form below to register for this event.</p>
            </div>

            {/* ===================================
                SUCCESS MESSAGE
            =================================== */}

            {successMessage && (
              <div
                id="registration-success"
                className="registration-success"
                role="status"
                aria-live="polite"
                tabIndex="-1"
              >
                <span className="success-icon" aria-hidden="true">
                  ✓
                </span>

                <div>
                  <strong>Registration Complete</strong>

                  <p>{successMessage}</p>
                </div>
              </div>
            )}

            <form
              className="registration-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* ================================
                  STUDENT NAME
              ================================= */}

              <div className="form-group">
                <label htmlFor="studentName">
                  Student Name
                  <span className="required-mark" aria-hidden="true">
                    *
                  </span>
                </label>

                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(formErrors.studentName)}
                  aria-describedby={
                    formErrors.studentName
                      ? "studentName-error"
                      : "studentName-help"
                  }
                />

                <small id="studentName-help">Enter your full name.</small>

                {formErrors.studentName && (
                  <p
                    id="studentName-error"
                    className="field-error"
                    role="alert"
                  >
                    {formErrors.studentName}
                  </p>
                )}
              </div>

              {/* ================================
                  EMAIL
              ================================= */}

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                  <span className="required-mark" aria-hidden="true">
                    *
                  </span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={
                    formErrors.email ? "email-error" : "email-help"
                  }
                />

                <small id="email-help">Enter a valid email address.</small>

                {formErrors.email && (
                  <p id="email-error" className="field-error" role="alert">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* ================================
                  STUDENT ID
              ================================= */}

              <div className="form-group">
                <label htmlFor="studentId">
                  Student ID
                  <span className="required-mark" aria-hidden="true">
                    *
                  </span>
                </label>

                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your student ID"
                  autoComplete="off"
                  aria-invalid={Boolean(formErrors.studentId)}
                  aria-describedby={
                    formErrors.studentId ? "studentId-error" : "studentId-help"
                  }
                />

                <small id="studentId-help">
                  Use letters, numbers, and hyphens.
                </small>

                {formErrors.studentId && (
                  <p id="studentId-error" className="field-error" role="alert">
                    {formErrors.studentId}
                  </p>
                )}
              </div>

              {/* ================================
                  EVENT
              ================================= */}

              <div className="form-group">
                <label htmlFor="event">Event</label>

                <input
                  id="event"
                  type="text"
                  value={event.name}
                  readOnly
                  className="readonly-input"
                />
              </div>

              {/* ================================
                  FORM ACTIONS
              ================================= */}

              <div className="form-actions">
                <button type="submit" className="register-button">
                  Register for Event
                </button>

                <button
                  type="button"
                  className="reset-button"
                  onClick={() => {
                    setFormData({
                      studentName: "",
                      email: "",
                      studentId: "",
                    });

                    setFormErrors({});
                    setSuccessMessage("");
                  }}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </section>
        </div>
      </article>
    </main>
  );
}

export default EventDetails;
