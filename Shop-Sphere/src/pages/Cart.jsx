import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <h1>Your Shopping Cart</h1>

          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <p>Add some products to your cart to get started.</p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // CART
  // ==========================================

  return (
    <main className="cart-page">
      <div className="container">
        <h1>Your Shopping Cart</h1>

        <div className="cart-items">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h2>{item.title}</h2>

                <p>ETB {item.price.toLocaleString()}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>−</button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <p className="cart-item-total">
                ETB {(item.price * item.quantity).toLocaleString()}
              </p>

              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        {/* CART SUMMARY */}

        <div className="cart-summary">
          <h2>Cart Total</h2>

          <p>ETB {cartTotal.toLocaleString()}</p>

          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart;
