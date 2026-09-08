import { useEffect, useState } from "react";

import { getCart, saveCart, clearCart } from "./cart";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // ========================================
  // LOAD CART
  // ========================================

  useEffect(() => {
    setCart(getCart());
  }, []);

  // ========================================
  // UPDATE CART
  // ========================================

  function updateCart(newCart) {
    setCart(newCart);

    saveCart(newCart);
  }

  // ========================================
  // INCREASE QUANTITY
  // ========================================

  function increaseQuantity(id) {
    const updated = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    updateCart(updated);
  }

  // ========================================
  // DECREASE QUANTITY
  // ========================================

  function decreaseQuantity(id) {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  }

  // ========================================
  // REMOVE ITEM
  // ========================================

  function removeItem(id) {
    const updated = cart.filter((item) => item.id !== id);

    updateCart(updated);
  }

  // ========================================
  // CLEAR CART
  // ========================================

  function handleClearCart() {
    clearCart();

    setCart([]);
  }

  // ========================================
  // TOTAL
  // ========================================

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ========================================
  // EMPTY CART
  // ========================================

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>

        <p>Your cart is empty.</p>
      </div>
    );
  }

  // ========================================
  // CART
  // ========================================

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Your Cart</h2>

        <button onClick={handleClearCart} className="clear-cart">
          Clear Cart
        </button>
      </div>

      {/* ====================================
          CART ITEMS
      ==================================== */}

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <h3>{item.name}</h3>

              <p>{item.price.toLocaleString()} ETB</p>
            </div>

            {/* QUANTITY */}

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>−</button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>

            {/* REMOVE */}

            <button className="remove-item" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ====================================
          TOTAL
      ==================================== */}

      <div className="cart-total">
        <span>Total</span>

        <strong>{total.toLocaleString()} ETB</strong>
      </div>
    </div>
  );
}
