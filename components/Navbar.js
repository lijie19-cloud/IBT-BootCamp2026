"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { itemCount, isHydrated } = useCart();

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link href="/" className="logo">
          <span className="logo-icon">AE</span>
          <span>Addis Eats</span>
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link href="/cart" className="cart-link">
            Cart
            <span className="cart-count" aria-label={`${itemCount} items`}>
              {isHydrated ? itemCount : 0}
            </span>
          </Link>

          <Link href="/menu" className="button button-primary nav-cta">
            Order Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
