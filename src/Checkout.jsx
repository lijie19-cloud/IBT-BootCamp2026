import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <p>Welcome to checkout.</p>

      <p>Your cart items will appear here.</p>

      <Link to="/menu" className="btn">
        Continue Shopping
      </Link>
    </section>
  );
}
