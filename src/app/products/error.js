"use client";

export default function ProductsError({ reset }) {
  return <main className="catalog-page"><div className="empty-state"><span aria-hidden="true">!</span><h1>We could not load the catalog.</h1><p>Please try again. The demo data remains safely stored in the project.</p><button className="button button-primary" onClick={() => reset()}>Try again</button></div></main>;
}
