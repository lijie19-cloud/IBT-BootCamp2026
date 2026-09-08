import { NavLink, Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app">
      {/* ================================
          HEADER
      ================================= */}

      <header className="site-header">
        <div className="logo">
          <Link to="/">Addis Eats</Link>
        </div>

        {/* ================================
            NAVIGATION
        ================================= */}

        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/menu">Menu</NavLink>

          <NavLink to="/checkout">Cart / Checkout</NavLink>

          <NavLink to="/signin">Sign In</NavLink>
        </nav>
      </header>

      {/* ================================
          PAGE CONTENT
          Child routes appear here
      ================================= */}

      <main>
        <Outlet />
      </main>

      {/* ================================
          FOOTER
      ================================= */}

      <footer className="site-footer">
        <div>
          <h3>Addis Eats</h3>

          <p>Authentic Ethiopian food made with love.</p>

          <p>© 2026 Addis Eats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
