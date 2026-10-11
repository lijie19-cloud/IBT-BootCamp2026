"use client";
export default function AddToCartButton({
  dish,
  quantity = 1,
  className = "btn btn-primary",
}) {
  function add() {
    try {
      const cart = JSON.parse(localStorage.getItem("addis-eats-cart") || "[]");
      const existing = cart.find((item) => item.id === dish.id);
      if (existing)
        existing.quantity = Math.min(20, existing.quantity + quantity);
      else
        cart.push({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          quantity,
        });
      localStorage.setItem("addis-eats-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("addis-cart-updated"));
      alert(`${dish.name} added to your cart.`);
    } catch {
      alert("Could not update your cart. Please try again.");
    }
  }
  return (
    <button className={className} onClick={add}>
      Add to cart · {dish.price} ETB
    </button>
  );
}
