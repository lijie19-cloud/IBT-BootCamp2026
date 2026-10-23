"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body>
        <main className="recovery-page">
          <div className="empty-state">
            <span aria-hidden="true">!</span>
            <h1>MarketHub needs to reload.</h1>
            <p>
              An unexpected application error occurred. Try rendering the
              application again.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={reset}
            >
              Reload page
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
