import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartTotal, clearCart } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Controls successful order screen
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Remove error when user starts correcting
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  // Validate the form
  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^(?:\+251|0)9\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid Ethiopian phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    }

    if (!formData.payment) {
      newErrors.payment = "Please select a payment method.";
    }

    return newErrors;
  }

  // Submit the checkout form
  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear the shopping cart
    clearCart();

    // Show successful order message
    setOrderPlaced(true);
  }

  // Prevent checkout when cart is empty
  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h1>Your cart is empty</h1>

            <p>You need to add products before checking out.</p>

            <button
              className="checkout-button"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Show order success screen
  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>

            <h1>Order Placed Successfully!</h1>

            <p>Thank you for shopping with ShopSphere.</p>

            <p>Your order has been received and will be processed soon.</p>

            <button
              className="checkout-button"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <p className="page-description">
          Complete your information to place your order.
        </p>

        <div className="checkout-layout">
          {/* CUSTOMER FORM */}
          <section className="checkout-form-section">
            <h2>Delivery Information</h2>

            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              {/* PHONE */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="09xxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>

              {/* ADDRESS */}
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>

                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  placeholder="Enter your delivery address"
                  value={formData.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <p className="form-error">{errors.address}</p>
                )}
              </div>

              {/* PAYMENT */}
              <div className="form-group">
                <label htmlFor="payment">Payment Method</label>

                <select
                  id="payment"
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                >
                  <option value="">Select payment method</option>

                  <option value="Cash on Delivery">Cash on Delivery</option>

                  <option value="TeleBirr">TeleBirr</option>

                  <option value="Bank Transfer">Bank Transfer</option>
                </select>

                {errors.payment && (
                  <p className="form-error">{errors.payment}</p>
                )}
              </div>

              {/* SUBMIT */}
              <button type="submit" className="place-order-button">
                Place Order
              </button>
            </form>
          </section>

          {/* ORDER SUMMARY */}
          <section className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.title} />

                  <div>
                    <h3>{item.title}</h3>

                    <p>
                      {item.quantity} × ETB {item.price.toLocaleString()}
                    </p>
                  </div>

                  <strong>
                    ETB {(item.price * item.quantity).toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Total</span>

              <strong>ETB {cartTotal.toLocaleString()}</strong>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Checkout;