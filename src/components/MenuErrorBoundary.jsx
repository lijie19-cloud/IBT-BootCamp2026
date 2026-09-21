import ErrorBoundary from "./ErrorBoundary";

function MenuErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      title="Menu temporarily unavailable"
      message="There was a problem loading the menu."
    >
      {children}
    </ErrorBoundary>
  );
}

export default MenuErrorBoundary;
