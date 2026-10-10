"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <Link href="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            AE
          </span>
          <span className="brand-Addis">
            Addis<span className="brand-accent">Eats</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
        <div className={`nav-links ${open ? "nav-links-open" : ""}`}>
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/menu" onClick={closeMenu}>
            Menu
          </Link>
          <Link href="/cart" onClick={closeMenu} className="nav-cart">
            Cart <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
