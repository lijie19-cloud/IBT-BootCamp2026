import useCartStore from "../store/cartStore";

function DishCard({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="dish-card">
      <img src={dish.image} alt={dish.name} />

      <h3>{dish.name}</h3>

      <p>{dish.price} ETB</p>

      <button onClick={() => addItem(dish)}>Add to Cart</button>
    </article>
  );
}

export default DishCard;
