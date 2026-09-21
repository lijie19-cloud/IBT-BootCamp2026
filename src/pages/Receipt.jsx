import { Link, useLocation, Navigate } from "react-router-dom";

function Receipt() {
  const location = useLocation();

  const order = location.state;

  /*
   * If someone visits /receipt directly,
   * there may be no order information.
   */
  if (!order) {
    return <Navigate to="/menu" replace />;
  }

  const { orderId, customer, items, total } = order;

  return (
    <section className="receipt-page">
      <div className="receipt-card">
        {/* SUCCESS MESSAGE */}
        <div className="success-message">
          <div className="receipt-icon">✅</div>

          <h1>Order Placed Successfully!</h1>

          <p className="success-text">
            Thank you, {customer.name}! Your Addis Eats order has been
            successfully placed.
          </p>
        </div>

        {/* ORDER ID */}
        <div className="order-confirmation">
          <span>Order ID</span>

          <strong>{orderId}</strong>
        </div>

        {/* CUSTOMER INFORMATION */}
        <div className="receipt-section">
          <h2>Delivery Information</h2>

          <div className="receipt-row">
            <span>Name</span>
            <strong>{customer.name}</strong>
          </div>

          <div className="receipt-row">
            <span>Phone</span>
            <strong>{customer.phone}</strong>
          </div>

          <div className="receipt-row">
            <span>Area</span>
            <strong>{customer.area}</strong>
          </div>

          {customer.notes && (
            <div className="receipt-row">
              <span>Notes</span>
              <strong>{customer.notes}</strong>
            </div>
          )}
        </div>

        {/* ORDER ITEMS */}
        <div className="receipt-section">
          <h2>Order Summary</h2>

          <div className="receipt-items">
            {items.map((item) => (
              <div className="receipt-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>

                  <span>
                    {item.quantity} × {item.price} ETB
                  </span>
                </div>

                <strong>{item.price * item.quantity} ETB</strong>
              </div>
            ))}
          </div>

          <div className="receipt-total">
            <span>Total Paid</span>

            <strong>{total} ETB</strong>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        <div className="order-success-alert" role="status" aria-live="polite">
          🎉 Your order has been received. We will prepare it for delivery.
        </div>

        {/* ACTIONS */}
        <div className="receipt-actions">
          <Link to="/menu" className="primary-button">
            Order More Food
          </Link>

          <Link to="/" className="secondary-button">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Receipt;
