import { Link } from "react-router-dom";

import useCartStore from "../store/cartStore";
import CartItem from "./CartItem";

function Cart() {
  const items = useCartStore((state) => state.items);

  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

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
        <div className="cart-items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div className="summary-row">
            <span>Total Quantity</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <button type="button" className="clear-button" onClick={clear}>
            Clear Cart
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
