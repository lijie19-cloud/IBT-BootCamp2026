import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useCartStore from "../store/cartStore";
import { submitOrder } from "../api/orderApi";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

/*
  Pure validation function.

  It only depends on the form argument.
  It does not change state, access the DOM,
  make API requests, or modify external data.
*/
export function validate(form) {
  const errors = {};

  const name = form.name.trim();
  const phone = form.phone.trim();
  const area = form.area.trim();

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!phone) {
    errors.phone = "Please enter your TeleBirr phone number.";
  } else if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    errors.phone =
      "Enter a valid Ethiopian phone number, for example 0912345678.";
  }

  if (!area) {
    errors.area = "Please select your delivery area.";
  }

  if (form.notes.length > 500) {
    errors.notes = "Notes must be 500 characters or fewer.";
  }

  return errors;
}

function Checkout() {
  const { user } = useAuth();

  const items = useCartStore((state) => state.items);

  const clear = useCartStore((state) => state.clear);

  const [form, setForm] = useState(initialForm);

  const [touched, setTouched] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const firstErrorRef = useRef(null);

  /*
    Errors are derived on every render.
    We do not store errors in state.
  */
  const errors = validate(form);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  /*
    Focus the first invalid field after
    a failed submission.
  */
  useEffect(() => {
    if (
      submitError &&
      Object.keys(errors).length > 0 &&
      firstErrorRef.current
    ) {
      firstErrorRef.current.focus();
    }
  }, [submitError, errors]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    /*
      Clear the server/request error when
      the user starts correcting the form.
    */
    if (submitError) {
      setSubmitError("");
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
      Mark every field as touched so all
      validation messages become visible.
    */
    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    setSubmitError("");
    setSuccessMessage("");

    /*
      Validate before sending anything.
    */
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      /*
        Focus the first invalid field.
      */
      const firstErrorField = Object.keys(validationErrors)[0];

      document.getElementById(firstErrorField)?.focus();

      return;
    }

    /*
      Prevent duplicate submissions.
    */
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const order = {
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          area: form.area.trim(),
          notes: form.notes.trim(),
        },

        user: user ?? null,

        items,

        total,
      };

      await submitOrder(order);

      setSuccessMessage("Your order was submitted successfully!");

      /*
        Clear the cart only after a successful
        request.
      */
      clear();

      /*
        Reset the form after successful submission.
      */
      setForm(initialForm);
      setTouched({});
    } catch (error) {
      /*
        IMPORTANT:
        We do NOT clear or reset the form here.

        The user keeps all entered values so they
        can correct the problem or try again.
      */
      setSubmitError(
        error.message || "We could not submit your order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
    If the cart is empty, show a helpful message.
  */
  if (items.length === 0 && !successMessage) {
    return (
      <section className="checkout-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart Is Empty</h1>

          <p>Add some delicious Ethiopian dishes before checking out.</p>

          <Link to="/menu" className="primary-button">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="page-heading">
        <h1>Checkout</h1>

        <p>Enter your delivery information to complete your order.</p>
      </div>

      {successMessage && (
        <div className="checkout-success" role="status" aria-live="polite">
          {successMessage}
        </div>
      )}

      {submitError && (
        <div className="checkout-error" role="alert" aria-live="assertive">
          <strong>Order could not be submitted.</strong>

          <p>{submitError}</p>

          <p>
            Your information has been kept. Please check the problem and try
            again.
          </p>
        </div>
      )}

      {!successMessage && (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <h2>Delivery Information</h2>

              <p className="form-help">
                All fields are required except delivery notes.
              </p>

              {/* NAME */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  ref={errors.name ? firstErrorRef : null}
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={
                    touched.name && errors.name ? "name-error" : undefined
                  }
                />

                {touched.name && errors.name && (
                  <p id="name-error" className="field-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* PHONE */}
              <div className="form-group">
                <label htmlFor="phone">TeleBirr Phone Number</label>

                <input
                  ref={errors.phone && !errors.name ? firstErrorRef : null}
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="09xxxxxxxx"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={touched.phone && !!errors.phone}
                  aria-describedby={
                    touched.phone && errors.phone ? "phone-error" : "phone-help"
                  }
                />

                <p id="phone-help" className="input-help">
                  Example: 0912345678
                </p>

                {touched.phone && errors.phone && (
                  <p id="phone-error" className="field-error" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* AREA */}
              <div className="form-group">
                <label htmlFor="area">Delivery Area</label>

                <select
                  ref={
                    errors.area && !errors.name && !errors.phone
                      ? firstErrorRef
                      : null
                  }
                  id="area"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.area && !!errors.area}
                  aria-describedby={
                    touched.area && errors.area ? "area-error" : undefined
                  }
                >
                  <option value="">Select your delivery area</option>

                  <option value="Bole">Bole</option>

                  <option value="Kazanchis">Kazanchis</option>

                  <option value="Megenagna">Megenagna</option>
                </select>

                {touched.area && errors.area && (
                  <p id="area-error" className="field-error" role="alert">
                    {errors.area}
                  </p>
                )}
              </div>

              {/* NOTES */}
              <div className="form-group">
                <label htmlFor="notes">
                  Delivery Notes <span className="optional">(optional)</span>
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Apartment number, landmark, or other instructions"
                  rows="5"
                  maxLength="500"
                  aria-invalid={touched.notes && !!errors.notes}
                  aria-describedby={
                    touched.notes && errors.notes ? "notes-error" : "notes-help"
                  }
                />

                <p id="notes-help" className="input-help">
                  Maximum 500 characters.
                </p>

                {touched.notes && errors.notes && (
                  <p id="notes-error" className="field-error" role="alert">
                    {errors.notes}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="place-order-button"
              disabled={submitting}
              aria-disabled={submitting}
            >
              {submitting
                ? "Submitting Order..."
                : `Place Order — ${total} ETB`}
            </button>
          </form>

          {/* ORDER SUMMARY */}
          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {items.map((item) => (
                <div className="checkout-item" key={item.id}>
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

            <div className="checkout-total">
              <span>Total</span>

              <strong>{total} ETB</strong>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Checkout;
