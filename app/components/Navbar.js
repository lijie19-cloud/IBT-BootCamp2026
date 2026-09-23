"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          🍽️ Addis Eats
        </Link>

        <nav>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/menu">Menu</Link>
            </li>

            <li>
              <Link href="/cart">
                Cart
                <span className="cart-count">{totalItems}</span>
              </Link>
            </li>

            <li>
              <Link href="/checkout">Checkout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
