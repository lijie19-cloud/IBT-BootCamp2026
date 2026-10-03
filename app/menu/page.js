import Link from "next/link";
import { getDishes } from "../../lib/dishes";

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">Our Selection</span>
        <h1>Our Menu</h1>
        <p>Choose from some of our favorite Ethiopian dishes.</p>
      </div>

      <div className="dish-grid">
        {dishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <div className="dish-card-content">
              <span className="dish-category">{dish.category}</span>

              <h2>{dish.name}</h2>

              <p>{dish.description}</p>

              <div className="dish-card-footer">
                <strong>{dish.price} ETB</strong>

                <Link href={`/menu/${dish.id}`} className="btn btn-secondary">
                  View Dish
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
