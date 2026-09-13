import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>ShopSphere</h2>

          <p>Shop smarter. Shop better.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/products">Products</Link>

          <Link to="/categories">Categories</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
