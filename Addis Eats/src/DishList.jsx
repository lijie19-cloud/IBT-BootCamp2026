import PropTypes from "prop-types";
import Dish from "./Dish";
function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return (
      <div className="empty-state">
        {" "}
        <p>No dishes found in this category.</p>{" "}
      </div>
    );
  }
  return (
    <section className="dish-list">
      {" "}
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAdd={onAdd} />
      ))}{" "}
    </section>
  );
}
DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};
export default DishList;
