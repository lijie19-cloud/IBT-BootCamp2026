function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-message" role="alert">
      <h2>Oops!</h2>

      <p>{message}</p>

      {onRetry && (
        <div className="error-actions">
          <button type="button" className="retry-button" onClick={onRetry}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;
