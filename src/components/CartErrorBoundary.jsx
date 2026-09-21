import ErrorBoundary from "./ErrorBoundary";

function CartErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      title="Cart temporarily unavailable"
      message="There was a problem displaying your cart."
    >
      {children}
    </ErrorBoundary>
  );
}

export default CartErrorBoundary;
