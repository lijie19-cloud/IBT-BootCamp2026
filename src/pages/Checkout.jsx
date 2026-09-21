import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCartStore from "../store/cartStore";
import useAuth from "../hooks/useAuth";
import { submitOrder } from "../api/orderApi";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!form.phone.trim()) {
    errors.phone = "TeleBirr phone number is required.";
  } else if (!/^(?:\+251|0)9\d{8}$/.test(form.phone.trim())) {
    errors.phone =
      "Enter a valid Ethiopian phone number, for example 0912345678.";
  }

  if (!form.area) {
    errors.area = "Please select a delivery area.";
  }

  return errors;
}

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);

  const errors = useMemo(() => {
    return validate(form);
  }, [form]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setSubmitError("");
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

    setSubmitError("");

    const validationErrors = validate(form);

    setTouched({
      name: true,
      phone: true,
      area: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.name) {
        nameRef.current?.focus();
      } else if (validationErrors.phone) {
        phoneRef.current?.focus();
      } else if (validationErrors.area) {
        areaRef.current?.focus();
      }

      return;
    }

    setIsSubmitting(true);

    try {
      const order = {
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          area: form.area,
          notes: form.notes.trim(),
        },
        items: [...items],
        total,
        user,
      };

      const result = await submitOrder(order);

      if (!result?.success) {
        throw new Error("Order could not be submitted.");
      }

      /*
       * IMPORTANT:
       * Do not clear the cart before navigating.
       *
       * First send the order information to the receipt page.
       */
      navigate("/receipt", {
        replace: true,
        state: {
          orderId: result.orderId,
          customer: order.customer,
          items: order.items,
          total: order.total,
        },
      });

      /*
       * Clear the cart after navigation has been triggered.
       */
      clear();
    } catch (error) {
      console.error("Checkout error:", error);

      setSubmitError(
        error.message || "Something went wrong while placing your order.",
      );

      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="checkout-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart Is Empty</h1>

          <p>Add some dishes to your cart before checking out.</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="page-heading">
        <h1>Checkout</h1>
        <p>Complete your delivery information.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-section">
            <h2>Delivery Information</h2>

            {/* NAME */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>

              <input
                ref={nameRef}
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={touched.name && Boolean(errors.name)}
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
                ref={phoneRef}
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="09xxxxxxxx"
                autoComplete="tel"
                aria-invalid={touched.phone && Boolean(errors.phone)}
                aria-describedby={
                  touched.phone && errors.phone ? "phone-error" : undefined
                }
              />

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
                ref={areaRef}
                id="area"
                name="area"
                value={form.area}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.area && Boolean(errors.area)}
                aria-describedby={
                  touched.area && errors.area ? "area-error" : undefined
                }
              >
                <option value="">Select delivery area</option>

                <option value="Bole">Bole</option>

                <option value="Kazanchis">Kazanchis</option>

                <option value="Megenagna">Megenagna</option>

                <option value="Piassa">Piassa</option>

                <option value="CMC">CMC</option>
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
                Delivery Notes
                <span className="optional"> (Optional)</span>
              </label>

              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Apartment number, landmark, or other instructions"
                rows="4"
              />
            </div>
          </div>

          {/* ERROR */}
          {submitError && (
            <div className="submit-error" role="alert">
              {submitError}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="checkout-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : `Place Order • ${total} ETB`}
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
    </section>
  );
}

export default Checkout;
