import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ dish, onAdd }) {
  const [count, setCount] = useState(0);
  function handleAdd() {
    setCount((currentCount) => currentCount + 1);
    onAdd(dish);
  }
  return (
    <article className="dish-card">
      {" "}
      <div className="dish-info">
        {" "}
        <div className="dish-title-row">
          {" "}
          <h3>{dish.name}</h3>{" "}
          {dish.spicy && <span className="spicy-badge"> 🌶️ Spicy </span>}{" "}
        </div>{" "}
        <p className="dish-category"> {dish.category} </p>{" "}
        <p className="dish-price"> {dish.price.toFixed(2)} ETB </p>{" "}
      </div>{" "}
      <div className="dish-actions">
        {" "}
        <button type="button" className="add-button" onClick={handleAdd}>
          {" "}
          Add{" "}
        </button>{" "}
        <span className="dish-count">
          {" "}
          {count} {count === 1 ? "item" : "items"}{" "}
        </span>{" "}
      </div>{" "}
    </article>
  );
}
Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    spicy: PropTypes.bool.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};
export default Dish;
