import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  // =========================================
  // GET CART COUNT
  // =========================================

  const { cartCount } = useCart();

  // =========================================
  // ACTIVE LINK CLASS
  // =========================================

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  // =========================================
  // NAVBAR
  // =========================================

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="nav-links">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/categories" className={navLinkClass}>
            Categories
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            <span className="cart-nav-link">
              Cart
              <span className="cart-count">{cartCount}</span>
            </span>
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
