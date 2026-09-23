"use client";

export default function Error({ error, reset }) {
  return (
    <section className="error-page">
      <div className="error-icon">⚠️</div>

      <h1>Something Went Wrong</h1>

      <p>We couldn't load the menu. Please try again.</p>

      <button type="button" className="primary-button" onClick={() => reset()}>
        Try Again
      </button>
    </section>
  );
}
