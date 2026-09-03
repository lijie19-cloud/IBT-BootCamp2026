import PropTypes from "prop-types";

export default function Dish({ name, price, spicy = false, image }) {
  return (
    <article className="dish-card">
      <div className="dish-image-container">
        <img src={image} alt={name} className="dish-image" />
      </div>

      <div className="dish-card-content">
        <h3>{name}</h3>

        <p className="dish-price">{price.toLocaleString()} ETB</p>

        {spicy && <span className="spicy-badge">🌶️ Spicy</span>}
      </div>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
};
