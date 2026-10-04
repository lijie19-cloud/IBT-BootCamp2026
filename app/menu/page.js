import SearchBox from "./SearchBox";
import PaginatedMenu from "./PaginatedMenu";

export default function MenuPage() {
  return (
    <main className="page-container">
      <section className="page-hero">
        <span className="section-label">Addis Eats</span>

        <h1>
          Ethiopian Food
          <br />
          <span>Made With Love.</span>
        </h1>

        <p>
          Discover authentic Ethiopian dishes, explore our menu, and enjoy a
          modern ordering experience.
        </p>
      </section>

      <SearchBox />

      <section className="menu-section">
        <div className="section-heading">
          <div>
            <span className="section-label">Explore</span>

            <h2>Our Menu</h2>
          </div>

          <span className="dish-count">Fresh & Delicious</span>
        </div>

        <PaginatedMenu />
      </section>
    </main>
  );
}
