import useCartStore from "../store/cartStore";

function CartItem({ item }) {
  // Narrow selector:
  // Only subscribe to removeItem.
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-info">
        <h3>{item.name}</h3>

        <p>Price: {item.price} ETB</p>

        <p>Quantity: {item.quantity}</p>

        <strong>Subtotal: {subtotal} ETB</strong>
      </div>

      <button className="remove-button" onClick={() => removeItem(item.id)}>
        Remove
      </button>
    </article>
  );
}

export default CartItem;
