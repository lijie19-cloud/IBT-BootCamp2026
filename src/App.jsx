import { useState } from "react";
import Menu from "../components/Menu";
import menu from "../components/data";

function Header() {
  return (
    <header className="header">
      <h1>Addis Eats</h1>
      <p>Delicious Ethiopian Food</p>
    </header>
  );
}

function App() {
  const [category, setCategory] = useState("All");

  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        <div className="filters">
          <button onClick={() => setCategory("All")}>All</button>

          <button onClick={() => setCategory("Main")}>Main</button>

          <button onClick={() => setCategory("Vegetarian")}>Vegetarian</button>

          <button onClick={() => setCategory("Dessert")}>Dessert</button>
        </div>

        <Menu dishes={menu} category={category} />
      </main>
    </div>
  );
}

export default App;
