import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link
            className="brand footer-brand"
            href="/#top"
            aria-label="MarketHub home"
          >
            <span className="brand-mark" aria-hidden="true">
              M
            </span>
            <span>MarketHub</span>
          </Link>
          <p>
            A thoughtful marketplace foundation for local buyers and independent
            sellers.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Explore</h2>
          <Link href="/">Home</Link>
          <Link href="/products">All products</Link>
          <Link href="/categories/food-drink">Food & Drink</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MarketHub</span>
        <span>Built By Lijalem Melisew(Fullstack Developer)</span>
      </div>
    </footer>
  );
}
