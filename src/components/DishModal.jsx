import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function DishModal({ dish, onClose }) {
  const modalRef = useRef(null);
  const previousElement = useRef(document.activeElement);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;

      previousElement.current?.focus();
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-backdrop" onMouseDown={handleBackdropClick}>
      <div
        ref={modalRef}
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        tabIndex="-1"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dish details"
        >
          ×
        </button>

        <img src={dish.image} alt={dish.name} className="modal-image" />

        <div className="modal-content">
          <span className="dish-category">{dish.category}</span>

          <h2 id="dish-modal-title">{dish.name}</h2>

          <p>{dish.description}</p>

          <strong className="modal-price">{dish.price} ETB</strong>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DishModal;
