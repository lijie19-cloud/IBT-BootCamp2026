import Dish from "./Dish";

function Header() {
  return (
    <header className="header">
      <h1>Addis Eats</h1>
      <p>Delicious Ethiopian Food</p>
    </header>
  );
}

function App() {
  const dishes = [
    {
      id: 1,
      name: "Kitfo",
      price: 1000,
    },
    {
      id: 2,
      name: "Shiro Wot",
      price: 250,
    },
    {
      id: 3,
      name: "Tibs",
      price: 1200,
    },
    {
      id: 4,
      name: "Vegetarian Firfir",
      price: 550,
    },
  ];

  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        <div className="menu">
          {dishes.map((dish) => (
            <Dish key={dish.id} name={dish.name} price={dish.price} />
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;
