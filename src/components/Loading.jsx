function Loading({ message = "Loading..." }) {
  return (
    <div
      className="loading-container"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading-spinner" aria-hidden="true"></div>

      <p>{message}</p>
    </div>
  );
}

export default Loading;
