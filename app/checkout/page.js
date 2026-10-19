"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../components/CartProvider";

const PHONE_REGEX = /^(?:\+251|251|0)9\d{8}$/;

const DELIVERY_OPTIONS = {
  delivery: { label: "Standard delivery", fee: 80 },
  express: { label: "Express delivery", fee: 120 },
  pickup: { label: "Restaurant pickup", fee: 0 },
};

const PAYMENT_OPTIONS = [
  { value: "cash", label: "Cash on delivery / pickup" },
  { value: "telebirr", label: "Telebirr (demo only)" },
  { value: "cbe-birr", label: "CBE Birr (demo only)" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, isHydrated } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
    deliveryMethod: "delivery",
    paymentMethod: "cash",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = DELIVERY_OPTIONS[form.deliveryMethod]?.fee ?? 80;
  const total = subtotal + deliveryFee;

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
  }

  function validateForm() {
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (!PHONE_REGEX.test(form.phone.trim())) {
      nextErrors.phone =
        "Use an Ethiopian mobile number, e.g. 0912345678 or +251912345678.";
    }

    if (form.deliveryMethod !== "pickup" && form.address.trim().length < 5) {
      nextErrors.address = "Enter your complete delivery address.";
    }

    if (!DELIVERY_OPTIONS[form.deliveryMethod]) {
      nextErrors.deliveryMethod = "Choose a delivery method.";
    }

    if (
      !PAYMENT_OPTIONS.some((option) => option.value === form.paymentMethod)
    ) {
      nextErrors.paymentMethod = "Choose a payment option.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setMessage("");

    if (!validateForm()) return;

    if (!isHydrated || items.length === 0) {
      setMessage("Your cart is empty. Add some dishes before checkout.");
      return;
    }

    setSubmitting(true);

    try {
      const idempotencyKey = crypto.randomUUID();

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          customer: {
            name: form.name,
            phone: form.phone,
            address: form.address,
            notes: form.notes,
          },
          deliveryMethod: form.deliveryMethod,
          paymentMethod: form.paymentMethod,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.order) {
        throw new Error(result.message || "Could not place your order.");
      }

      // Save the returned order before clearing the cart.
      const existingOrders = JSON.parse(
        localStorage.getItem("addisEatsOrders") || "[]",
      );

      if (!Array.isArray(existingOrders)) {
        throw new Error("Could not save your order in this browser.");
      }

      localStorage.setItem(
        "addisEatsOrders",
        JSON.stringify([result.order, ...existingOrders]),
      );

      clearCart();
      router.push(`/orders/${result.order.id}`);
    } catch (error) {
      setMessage(
        error.message ||
          "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!isHydrated) {
    return (
      <main className="page-container">
        <p>Loading your cart...</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="page-container checkout-page">
        <h1>Your cart is empty</h1>
        <p>Add dishes to your cart before checking out.</p>
        <Link href="/menu" className="button">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container checkout-page">
      <div className="page-heading">
        <p className="eyebrow">Almost there</p>
        <h1>Checkout</h1>
        <p>Enter your details and review your order.</p>
      </div>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <section className="checkout-section">
            <h2>Customer information</h2>

            <label htmlFor="name">Full name *</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={updateField}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <p className="field-error" id="name-error">
                {errors.name}
              </p>
            )}

            <label htmlFor="phone">Ethiopian mobile number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="0912345678"
              value={form.phone}
              onChange={updateField}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              required
            />
            {errors.phone && (
              <p className="field-error" id="phone-error">
                {errors.phone}
              </p>
            )}
          </section>

          <section className="checkout-section">
            <h2>Delivery method</h2>
            <label htmlFor="deliveryMethod">
              Choose how to receive your order *
            </label>
            <select
              id="deliveryMethod"
              name="deliveryMethod"
              value={form.deliveryMethod}
              onChange={updateField}
            >
              <option value="delivery">Standard delivery — 80 ETB</option>
              <option value="express">Express delivery — 120 ETB</option>
              <option value="pickup">Restaurant pickup — free</option>
            </select>

            {form.deliveryMethod !== "pickup" && (
              <>
                <label htmlFor="address">Delivery address *</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  autoComplete="street-address"
                  placeholder="Area, street, building, and nearby landmark"
                  value={form.address}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={
                    errors.address ? "address-error" : undefined
                  }
                  required
                />
                {errors.address && (
                  <p className="field-error" id="address-error">
                    {errors.address}
                  </p>
                )}
              </>
            )}
          </section>

          <section className="checkout-section">
            <h2>Payment method</h2>
            <label htmlFor="paymentMethod">
              Choose a demo payment option *
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={updateField}
            >
              {PAYMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="checkout-hint">
              Demo only: no money will be charged or transferred.
            </p>
          </section>

          <section className="checkout-section">
            <h2>Additional notes</h2>
            <label htmlFor="notes">Special instructions (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              maxLength={500}
              placeholder="Delivery instructions or food preferences"
              value={form.notes}
              onChange={updateField}
            />
          </section>

          {message && (
            <p className="form-message" role="alert">
              {message}
            </p>
          )}

          <button
            className="button checkout-submit"
            type="submit"
            disabled={submitting || !isHydrated}
          >
            {submitting ? "Placing order..." : "Place Order"}
          </button>

          <p className="checkout-hint">
            This prototype saves orders in this browser only.
          </p>
        </form>

        <aside className="order-summary">
          <h2>Order summary</h2>

          {items.map((item) => (
            <div className="summary-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  {item.quantity} × {item.price} ETB
                </p>
              </div>
              <span>{item.quantity * item.price} ETB</span>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{subtotal} ETB</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "Free" : `${deliveryFee} ETB`}</span>
          </div>
          <div className="summary-row summary-total">
            <strong>Total</strong>
            <strong>{total} ETB</strong>
          </div>

          <Link href="/cart" className="summary-edit">
            Edit cart
          </Link>
        </aside>
      </div>
    </main>
  );
}
