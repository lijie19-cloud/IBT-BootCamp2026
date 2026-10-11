"use client";
export default function GlobalError({ error, reset }) {
  return (
    <div className="page-shell">
      <div className="container">
        <div className="empty-state">
          <h1>Something went wrong.</h1>
          <p>Please try again.</p>
          <button className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
