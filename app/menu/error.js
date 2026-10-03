"use client";

export default function Error({ error, reset }) {
  return (
    <div className="status-page">
      <div className="status-card">
        <span className="status-code">Error</span>

        <h2>Something went wrong!</h2>

        <p>We couldn't load the menu right now.</p>

        <button className="btn btn-primary" onClick={() => reset()}>
          Try Again
        </button>
      </div>
    </div>
  );
}
