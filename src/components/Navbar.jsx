import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <NavLink to="/" className="logo">
          CampusConnect
        </NavLink>

        {/* Navigation */}
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/clubs">Clubs</NavLink>

          <NavLink to="/events">Events</NavLink>

          <NavLink to="/resources">Resources</NavLink>

          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
