import MenuList from "./MenuList";

export default function MenuPage() {
  return (
    <section>
      <div className="page-heading">
        <span className="section-label">OUR MENU</span>

        <h1>Discover Our Dishes</h1>

        <p>
          Enjoy traditional Ethiopian flavors prepared with authentic
          ingredients and spices.
        </p>
      </div>

      <MenuList />
    </section>
  );
}
