import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSuccessMessage(
      "Thank you! Your message has been submitted successfully.",
    );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <p className="page-label">GET IN TOUCH</p>

          <h2>Contact Us</h2>

          <p>Have a question? Send us a message.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message"
              rows="6"
              required
            />
          </div>

          <button type="submit" className="button primary-button">
            Send Message
          </button>

          {successMessage && (
            <p className="success-message">✓ {successMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
