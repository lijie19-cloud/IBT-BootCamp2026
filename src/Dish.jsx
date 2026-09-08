import PropTypes from "prop-types";

export default function Dish({
  name,
  price,
  spicy = false,
  image,
  description,
}) {
  return (
    <article className="dish-card">
      {/* ====================================
          IMAGE
      ==================================== */}

      <div className="dish-image-container">
        <img src={image} alt={name} className="dish-image" />
      </div>

      {/* ====================================
          CONTENT
      ==================================== */}

      <div className="dish-card-content">
        <h3>{name}</h3>

        <p className="dish-description">{description}</p>

        <div className="dish-bottom">
          <p className="dish-price">{price.toLocaleString()} ETB</p>

          {spicy && <span className="spicy-badge">🌶️ Spicy</span>}
        </div>
      </div>
    </article>
  );
}

// ========================================
// PROP TYPES
// ========================================

Dish.propTypes = {
  name: PropTypes.string.isRequired,

  price: PropTypes.number.isRequired,

  spicy: PropTypes.bool,

  image: PropTypes.string.isRequired,

  description: PropTypes.string.isRequired,
};
