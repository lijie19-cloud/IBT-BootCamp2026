import PropTypes from "prop-types";
import Card from "./card";

function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <Card>
      <article className="dish">
        <h3>{name}</h3>

        <p className="price">
          {price} {currency}
        </p>

        {typeof spicy === "boolean" && spicy && (
          <span className="spicy-badge">Spicy</span>
        )}
      </article>
    </Card>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default Dish;
