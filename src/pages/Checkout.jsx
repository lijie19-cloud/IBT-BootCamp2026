// Import React hooks
import { useState } from "react";

// Import navigation hook
import { useNavigate } from "react-router-dom";

// Import cart context
import { useCart } from "../context/CartContext";

// Checkout page
function Checkout() {
  // Get cart information and functions
  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  // Navigation function
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Order success state
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Generated order number
  const [orderNumber, setOrderNumber] = useState("");

  // Delivery fee
  const deliveryFee = cart.length > 0 ? 500 : 0;

  // Final total
  const grandTotal = cartTotal + deliveryFee;

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Remove the error for this field
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  // Validate the checkout form
  function validateForm() {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(?:\+251|0)9\d{8}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid Ethiopian phone number, for example 0912345678.";
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // Handle checkout submission
  function handleSubmit(event) {
    event.preventDefault();

    // Validate the form
    const isValid = validateForm();

    // Stop if validation fails
    if (!isValid) {
      return;
    }

    // Generate a simple order number
    const newOrderNumber = `SS-${Date.now()}`;

    // Save the order number
    setOrderNumber(newOrderNumber);

    // Show success screen
    setOrderSuccess(true);

    // Clear the shopping cart
    clearCart();
  }

  // If the cart is empty and there is no successful order
  if (cart.length === 0 && !orderSuccess) {
    return (
      <section className="empty-checkout">
        <h1>Your Cart Is Empty</h1>

        <p>
          You need to add products to your cart before checking out.
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  // Successful order screen
  if (orderSuccess) {
    return (
      <section className="order-success">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you, {formData.name}. Your order has been received.
        </p>

        <p>
          Your order number is:
          <strong> {orderNumber}</strong>
        </p>

        <p>
          We will contact you using {formData.phone}.
        </p>

        <div className="success-actions">
          <button
            type="button"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </section>
    );
  }

  // Checkout page
  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>

        <p>
          Complete your information to place your order.
        </p>
      </div>

      <div className="checkout-layout">
        {/* Checkout form */}
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2>Delivery Information</h2>

          {/* Full name */}
          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            {errors.name && (
              <p className="form-error">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="form-error">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
            />

            {errors.phone && (
              <p className="form-error">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
              rows="4"
            />

            {errors.address && (
              <p className="form-error">
                {errors.address}
              </p>
            )}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">
              City
            </label>

            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Addis Ababa"
            />

            {errors.city && (
              <p className="form-error">
                {errors.city}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            className="place-order-button"
            type="submit"
          >
            Place Order
          </button>
        </form>

        {/* Order summary */}
        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity} ×{" "}
                    {item.price.toLocaleString()} ETB
                  </p>
                </div>

                <strong>
                  {(item.price * item.quantity).toLocaleString()} ETB
                </strong>
              </div>
            ))}
          </div>

          <div className="summary-line">
            <span>Subtotal</span>

            <strong>
              {cartTotal.toLocaleString()} ETB
            </strong>
          </div>

          <div className="summary-line">
            <span>Delivery</span>

            <strong>
              {deliveryFee.toLocaleString()} ETB
            </strong>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              {grandTotal.toLocaleString()} ETB
            </strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
