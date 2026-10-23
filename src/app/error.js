"use client";

import { useEffect } from "react";

export default function AppError({ error, reset }) {
  useEffect(() => {
    console.error("MarketHub route error", error);
  }, [error]);
  return (
    <main className="recovery-page">
      <div className="empty-state">
        <span aria-hidden="true">!</span>
        <h1>Something went wrong.</h1>
        <p>
          The page could not finish loading. Your browser-local demo data has
          not been intentionally cleared.
        </p>
        <button className="button button-primary" type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
