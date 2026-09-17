import { Link } from "react-router-dom";

import useCartStore from "../store/cartStore";
import CartItem from "./CartItem";

function Cart() {
  // Narrow selector:
  // This component subscribes only to items.
  const items = useCartStore((state) => state.items);

  // Narrow selector:
  // This component subscribes only to clear.
  const clear = useCartStore((state) => state.clear);

  // Calculate cart total.
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Empty cart.
  if (items.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart Is Empty</h1>

          <p>Add some delicious Ethiopian dishes to your cart.</p>

          <Link to="/menu" className="primary-button">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="page-heading">
        <h1>Your Cart</h1>

        <p>Review your selected dishes.</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div className="summary-row">
            <span>Total Quantity</span>
            <span>
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <button className="clear-button" onClick={clear}>
            Clear Cart
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
