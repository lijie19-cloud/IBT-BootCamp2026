"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../components/CartProvider";

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const deliveryFee = cart.length > 0 ? 100 : 0;
  const vat = Math.round(subtotal * 0.15);
  const total = subtotal + deliveryFee + vat;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(?:\+251|0)9\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid Ethiopian phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    }
  }

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-cart-icon">🛒</div>

        <h1>Your Cart Is Empty</h1>

        <p>Add some dishes before proceeding to checkout.</p>

        <Link href="/menu" className="primary-button">
          Browse Menu
        </Link>
      </section>
    );
  }

  if (success) {
    return (
      <section className="success-page">
        <div className="success-icon">✓</div>

        <h1>Order Received!</h1>

        <p>Thank you, {formData.name}.</p>

        <p>Your Addis Eats order has been received successfully.</p>

        <div className="order-total">Total: {total.toLocaleString()} ETB</div>

        <Link href="/menu" className="primary-button">
          Order More Food
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-heading">
        <span className="section-label">FINAL STEP</span>

        <h1>Checkout</h1>

        <p>Enter your delivery information to complete your order.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              aria-describedby={errors.name ? "name-error" : undefined}
            />

            {errors.name && (
              <p id="name-error" className="field-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="09xxxxxxxx"
              value={formData.phone}
              onChange={handleChange}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />

            {errors.phone && (
              <p id="phone-error" className="field-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>

            <textarea
              id="address"
              name="address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              aria-describedby={errors.address ? "address-error" : undefined}
            />

            {errors.address && (
              <p id="address-error" className="field-error">
                {errors.address}
              </p>
            )}
          </div>

          <button type="submit" className="primary-button">
            Place Order
          </button>
        </form>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                {(item.price * item.quantity).toLocaleString()} ETB
              </strong>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>{subtotal.toLocaleString()} ETB</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>{deliveryFee.toLocaleString()} ETB</strong>
          </div>

          <div className="summary-row">
            <span>VAT (15%)</span>

            <strong>{vat.toLocaleString()} ETB</strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>{total.toLocaleString()} ETB</strong>
          </div>

          <Link href="/cart" className="continue-link">
            ← Back to Cart
          </Link>
        </aside>
      </div>
    </section>
  );
}
