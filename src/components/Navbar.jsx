import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function getNavLinkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* =========================
            LOGO / BRAND
        ========================= */}
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">CC</span>

          <span className="logo-text">CampusConnect</span>
        </NavLink>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* =========================
            NAVIGATION LINKS
        ========================= */}
        <div
          id="main-navigation"
          className={`nav-menu ${menuOpen ? "open" : ""}`}
        >
          <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/clubs" className={getNavLinkClass} onClick={closeMenu}>
            Clubs
          </NavLink>

          <NavLink to="/events" className={getNavLinkClass} onClick={closeMenu}>
            Events
          </NavLink>

          <NavLink
            to="/resources"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            Resources
          </NavLink>

          <NavLink to="/about" className={getNavLinkClass} onClick={closeMenu}>
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
