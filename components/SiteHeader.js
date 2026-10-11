"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Our menu" },
    { href: "/orders", label: "My orders" },
  ];
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="Addis Eats home"><span className="logo">AE</span>
          Addis<span style={{ color: "#fc0000" }}>Eats.</span>
        </Link>
        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kitchen" onClick={() => setOpen(false)}>
            Kitchen
          </Link>
        </nav>
        <div className="nav-actions">
          <Link className="btn btn-primary" href="/cart">
            Cart <span aria-hidden="true">↗</span>
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
