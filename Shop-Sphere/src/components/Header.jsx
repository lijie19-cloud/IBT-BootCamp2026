import { NavLink } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Header() {
  const { cartCount, message } = useCart();

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <NavLink to="/" className="logo">
          <img
            src="\ShopSphere.png"
            alt="ShopSphere"
            className="logo-image"
          />

          {/* <span>ShopSphere</span> */}
        </NavLink>

        {/* Navigation */}
        <nav className="navigation">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/products">Products</NavLink>

          <NavLink to="/categories">Categories</NavLink>

          <NavLink to="/cart">Cart ({cartCount})</NavLink>

          <NavLink to="/about">About</NavLink>
        </nav>
      </div>

      {/* Cart success message */}
      {message && <div className="cart-success-message">✓ {message}</div>}
    </header>
  );
}

export default Header;
