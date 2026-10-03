import { placeOrder } from "../actions";

export default function CheckoutPage() {
  return (
    <section className="checkout-page">
      <div className="page-heading">
        <span className="eyebrow">Almost There</span>

        <h1>Checkout</h1>

        <p>Enter your information to place your order.</p>
      </div>

      <form action={placeOrder} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0912345678"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          Place Order
        </button>
      </form>
    </section>
  );
}
