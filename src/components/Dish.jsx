import useCartStore from "../store/cartStore";

function Dish({ dish }) {
  // Narrow selector:
  // Only subscribe to addItem.
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(dish);
  };

  return (
    <article className="dish-card">
      <div className="dish-image-wrapper">
        <img src={dish.image} alt={dish.name} className="dish-image" />
      </div>

      <div className="dish-content">
        <span className="dish-category">{dish.category}</span>

        <h2>{dish.name}</h2>

        <p className="dish-description">{dish.description}</p>

        <div className="dish-footer">
          <strong className="dish-price">{dish.price} ETB</strong>

          <button className="add-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default Dish;
