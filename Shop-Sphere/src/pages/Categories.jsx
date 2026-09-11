import { Link } from "react-router-dom";

function Categories() {
const categories = [
"Electronics",
"Clothing",
"Beauty"
];

return ( <main className="categories-page"> <div className="container">
    <h1>Categories</h1>

    <p className="page-description">
      Browse products by category.
    </p>

    <div className="category-grid">

      {categories.map((category) => (
        <Link
          key={category}
          to={`/products?category=${category}`}
          className="category-card"
        >
          <h2>{category}</h2>

          <p>
            Explore {category.toLowerCase()} products.
          </p>
        </Link>
      ))}

    </div>

  </div>
</main>

);
}

export default Categories;
