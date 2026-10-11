import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand">
              <span className="logo">AE</span>Addis<span style={{ color: "#fc0000" }}>Eats.</span>
            </Link>
            <p>
              Good food brings people together. Discover Ethiopian favorites
              made with care, served with heart.
            </p>
          </div>
          <div>
            <strong>Explore</strong>
            <p>
              <Link href="/menu">Browse menu</Link>
              <br />
              <Link href="/cart">Your cart</Link>
              <br />
              <Link href="/signin">Sign in</Link>
            </p>
          </div>
          <div>
            <strong>Need help?</strong>
            <p>
              Contact us at
              <br />
              <Link href="mailto:lijiesm@gmail.com">lijiesm@gmail.com</Link>
              <br />
              <Link href="callto:+251912345678">+251 9972414255</Link>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Addis Eats. Built with care in Ethiopia.
        </div>
      </div>
    </footer>
  );
}
