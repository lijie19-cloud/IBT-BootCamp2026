function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="error-message" role="alert">
      <h2>Oops!</h2>

      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
