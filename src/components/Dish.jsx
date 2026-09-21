import { memo, useState } from "react";

import useCartStore from "../store/cartStore";
import DishModal from "./DishModal";

function Dish({ dish }) {
  const [showModal, setShowModal] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  /*
    Development-only error testing.

    Add forceError: true to a dish to test
    the MenuErrorBoundary.
  */
  if (import.meta.env.DEV && dish.forceError) {
    throw new Error(`Test error: ${dish.name}`);
  }

  const handleAdd = () => {
    addItem(dish);
  };

  return (
    <>
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

            <div className="dish-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowModal(true)}
              >
                View Details
              </button>

              <button type="button" className="add-button" onClick={handleAdd}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </article>

      {showModal && (
        <DishModal dish={dish} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default memo(Dish);
