import MenuBrowser from "../../components/MenuBrowser";

export const metadata = {
  title: "Our Menu | Addis Eats",
  description:
    "Explore Ethiopian traditional dishes, vegetarian meals, and breakfast favorites.",
};

export default function MenuPage() {
  return (
    <>
      <section className="menu-hero">
        <div className="container">
          <span className="eyebrow">MADE WITH ETHIOPIAN LOVE</span>
          <h1>Our Menu</h1>
          <p>
            Explore traditional flavors, comforting favorites, and delicious
            vegetarian dishes.
          </p>
        </div>
      </section>

      <section className="container menu-section">
        <MenuBrowser />
      </section>
    </>
  );
}
