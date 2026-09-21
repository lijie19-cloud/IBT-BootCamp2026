import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Component:", errorInfo.componentStack);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary" role="alert">
          <div className="error-icon">⚠️</div>

          <h2>{this.props.title || "Something went wrong"}</h2>

          <p>{this.props.message || "This section could not be displayed."}</p>

          <button
            type="button"
            className="primary-button"
            onClick={this.handleRetry}
          >
            Try Again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
