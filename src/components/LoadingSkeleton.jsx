function LoadingSkeleton({ message = "Loading..." }) {
  return (
    <section className="loading-page" aria-live="polite" aria-busy="true">
      <div className="loading-skeleton">
        <div className="skeleton skeleton-title" />

        <div className="skeleton skeleton-text" />

        <div className="skeleton skeleton-text short" />

        <div className="skeleton-grid">
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
        </div>

        <p>{message}</p>
      </div>
    </section>
  );
}

export default LoadingSkeleton;
