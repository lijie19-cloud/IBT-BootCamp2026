"use client";

export default function QuantitySelector({ quantity, onChange, max = 20 }) {
  return (
    <div className="quantity-control">
      <span id="quantity-label">Quantity</span>

      <div className="quantity-buttons">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>

        <output aria-labelledby="quantity-label">{quantity}</output>

        <button
          type="button"
          onClick={() => onChange(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
