import { Link, useParams } from "react-router-dom";

import useCartStore from "../store/cartStore";

const dishes = [
  {
    id: 1,
    name: "Kitfo",
    price: 700,
    category: "Traditional",
    description:
      "Minced beef seasoned with Ethiopian spices and clarified butter.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    name: "Shiro Wot",
    price: 280,
    category: "Vegetarian",
    description: "Delicious chickpea stew prepared with traditional spices.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    name: "Vegetarian Firfir",
    price: 550,
    category: "Vegetarian",
    description:
      "Shredded injera mixed with spicy berbere sauce and vegetables.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    name: "Tibs",
    price: 1220,
    category: "Traditional",
    description:
      "Tender pieces of meat sautéed with onions, peppers and spices.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  },
];

function DishDetail() {
  const { id } = useParams();

  // Convert URL parameter to number.
  const dish = dishes.find((item) => item.id === Number(id));

  // Narrow selector.
  const addItem = useCartStore((state) => state.addItem);

  if (!dish) {
    return (
      <section className="empty-state">
        <h1>Dish Not Found</h1>

        <Link to="/menu" className="primary-button">
          Back to Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="dish-detail">
      <div className="detail-image">
        <img src={dish.image} alt={dish.name} />
      </div>

      <div className="detail-content">
        <span className="dish-category">{dish.category}</span>

        <h1>{dish.name}</h1>

        <p className="detail-description">{dish.description}</p>

        <strong className="detail-price">{dish.price} ETB</strong>

        <button className="primary-button" onClick={() => addItem(dish)}>
          Add to Cart
        </button>

        <Link to="/menu" className="secondary-button">
          Back to Menu
        </Link>
      </div>
    </section>
  );
}

export default DishDetail;
