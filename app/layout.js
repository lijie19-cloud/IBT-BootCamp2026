import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Order delicious food in Addis Ababa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-content">
            <Link href="/" className="logo">
              Addis Eats
            </Link>

            <nav className="main-nav">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <div className="container">{children}</div>
        </main>

        <footer className="site-footer">
          <div className="container">
            <p>© 2026 Addis Eats. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
