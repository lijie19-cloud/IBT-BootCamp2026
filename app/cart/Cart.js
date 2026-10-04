"use client";

import { useQuery } from "@tanstack/react-query";

async function getCart() {
  const response = await fetch("/api/cart");

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}

export default function Cart() {
  const { data, error, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isPending) {
    return <div className="loading-message">Loading cart...</div>;
  }

  if (error) {
    return <div className="error-message">Could not load cart.</div>;
  }

  return (
    <section>
      <div className="page-hero small">
        <span className="section-label">Addis Eats</span>

        <h1>
          Your
          <br />
          <span>Cart.</span>
        </h1>
      </div>

      {data.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h2>Your cart is empty</h2>

          <p>Add some delicious food from our menu.</p>
        </div>
      ) : (
        <div className="cart-list">
          {data.map((dish, index) => (
            <article key={`${dish.id}-${index}`} className="cart-item">
              <div className="dish-icon">🍛</div>

              <div className="cart-item-info">
                <h3>{dish.name}</h3>

                <p>{dish.category}</p>
              </div>

              <strong>{dish.price} ETB</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
