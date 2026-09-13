import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function Cart() {
  // =========================================
  // GET CART DATA AND FUNCTIONS
  // =========================================

  const {
    cart,
    cartTotal,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
const navigate = useNavigate();
  // =========================================
  // EMPTY CART
  // =========================================

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="page-heading">
            <span className="section-label">SHOPPING CART</span>

            <h2>Your Cart Is Empty</h2>

            <p>You haven't added any products yet.</p>
          </div>

          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h3>No products in your cart</h3>

            <p>Browse our products and add something you love.</p>

            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // CART PAGE
  // =========================================

  return (
    <section className="page-section">
      <div className="container">
        {/* PAGE HEADING */}
        <div className="page-heading">
          <span className="section-label">SHOPPING CART</span>

          <h2>Your Shopping Cart</h2>

          <p>
            You have {cartCount} {cartCount === 1 ? "item" : "items"} in your
            cart.
          </p>
        </div>

        {/* CART LAYOUT */}
        <div className="cart-layout">
          {/* CART ITEMS */}
          <div className="cart-items">
            {cart.map((item) => (
              <article key={item.id} className="cart-item">
                {/* IMAGE */}
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* INFORMATION */}
                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>

                  <h3>{item.name}</h3>

                  <p className="cart-item-price">
                    {item.price.toLocaleString()} ETB
                  </p>
                </div>

                {/* QUANTITY */}
                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                {/* ITEM TOTAL */}
                <div className="cart-item-total">
                  <strong>
                    {(item.price * item.quantity).toLocaleString()} ETB
                  </strong>
                </div>

                {/* REMOVE */}
                <button
                  type="button"
                  className="remove-cart-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </article>
            ))}

            {/* CLEAR CART */}
            <button
              type="button"
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          {/* CART SUMMARY */}
          <aside className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items</span>

              <strong>{cartCount}</strong>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>{cartTotal.toLocaleString()} ETB</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <strong>Free</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>

              <strong>{cartTotal.toLocaleString()} ETB</strong>
            </div>

            <button type="button" className="btn btn-primary checkout-button" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
