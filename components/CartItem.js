"use client";

import Link from "next/link";
import { formatPrice } from "../lib/dishes";
import { useCart } from "./CartProvider";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <Link
        href={`/menu/${item.id}`}
        className="cart-item-image"
        aria-label={`View ${item.name}`}
      >
        <img src={item.image} alt={item.name} />
      </Link>

      <div className="cart-item-info">
        <h2>
          <Link href={`/menu/${item.id}`}>{item.name}</Link>
        </h2>

        <p className="cart-item-unit-price">{formatPrice(item.price)} each</p>

        <div className="cart-item-controls">
          <div
            className="quantity-buttons"
            aria-label={`Quantity for ${item.name}`}
          >
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              aria-label={`Decrease ${item.name} quantity`}
            >
              −
            </button>

            <output aria-label={`Quantity: ${item.quantity}`}>
              {item.quantity}
            </output>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              disabled={item.quantity >= 20}
              aria-label={`Increase ${item.name} quantity`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="remove-button"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="cart-line-total">
        {formatPrice(item.price * item.quantity)}
      </div>
    </article>
  );
}
