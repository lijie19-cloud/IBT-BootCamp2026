import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link href="/" className="brand footer-brand">
          <span className="brand-mark" aria-hidden="true">
            AE
          </span>
          <span className="brand-Addis">
            Addis<span className="brand-accent">Eats</span>
          </span>
        </Link>
        <p>Good food. Ethiopian roots. Delivered with care.</p>
        <span className="footer-copy">
          © {new Date().getFullYear()} Addis Eats
        </span>
      </div>
    </footer>
  );
}
