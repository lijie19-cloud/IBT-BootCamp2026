import Menu from "./Menu";

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container">
          <div className="logo">
            <span className="logo-mark">AE</span>

            <div>
              <h1>ADDIS EATS</h1>
              <p>Ethiopian Food & Culture</p>
            </div>
          </div>

          <nav>
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="container">
            <p className="eyebrow">AUTHENTIC ETHIOPIAN CUISINE</p>

            <h2>
              Taste the heart
              <br />
              of Ethiopia.
            </h2>

            <p className="hero-text">
              Experience traditional Ethiopian flavors, fresh ingredients, and
              meals made with love.
            </p>

            <a href="#menu" className="hero-button">
              Explore Our Menu
            </a>
          </div>
        </section>

        <div id="menu">
          <Menu />
        </div>

        <section id="about" className="about">
          <div className="container">
            <p className="eyebrow">ABOUT ADDIS EATS</p>

            <h2>Food that brings people together.</h2>

            <p>
              At Addis Eats, we celebrate the rich flavors and traditions of
              Ethiopian cuisine. From spicy wot to delicious vegetarian dishes,
              every meal is prepared to give you an authentic taste of Ethiopia.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Addis Eats. All rights reserved.</p>

          <p>Made with ❤️ in Addis Ababa</p>
        </div>
      </footer>
    </div>
  );
}