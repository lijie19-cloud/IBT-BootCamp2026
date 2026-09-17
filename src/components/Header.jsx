import { Link, NavLink } from "react-router-dom";

import useCartStore from "../store/cartStore";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

function Header() {
  // Narrow selector:
  // This component only subscribes to cart items.
  const items = useCartStore((state) => state.items);

  // Calculate number of products in cart.
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const { user, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">AE</span>
          <span>Addis Eats</span>
        </Link>

        {/* Navigation */}
        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/menu">Menu</NavLink>

          <NavLink to="/cart">Cart ({cartCount})</NavLink>

          <NavLink to="/checkout">Checkout</NavLink>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
