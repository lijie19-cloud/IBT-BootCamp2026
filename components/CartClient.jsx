"use client";

import { useState } from "react";

export default function CartClient() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Kitfo",
      price: 350,
      quantity: 1,
    },
  ]);

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">Your Order</span>
        <h1>Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>

          <p>Add some delicious food from our menu.</p>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <h2>{item.name}</h2>

                  <p>{item.price} ETB each</p>
                </div>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <strong>{item.price * item.quantity} ETB</strong>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: {total} ETB</h2>

            <a href="/checkout" className="btn btn-primary">
              Continue to Checkout
            </a>
          </div>
        </>
      )}
    </section>
  );
}
