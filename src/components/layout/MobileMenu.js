"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AccountActions from "@/components/auth/AccountActions";
import CommerceLinks from "@/components/commerce/CommerceLinks";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All products" },
  { href: "/categories/fashion", label: "Fashion" },
  { href: "/categories/home-living", label: "Home & Living" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 1181px)");
    const handleDesktopChange = (event) => {
      if (event.matches) setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();
  }, [isOpen]);

  return (
    <div className="mobile-menu-wrap">
      <button
        ref={buttonRef}
        className={`icon-button menu-button${isOpen ? " menu-button-open" : ""}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-haspopup="true"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      {isOpen && (
        <>
          <button
            className="mobile-menu-backdrop"
            type="button"
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="mobile-panel"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav aria-label="Mobile navigation">
              {links.map((link, index) => (
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-panel-footer">
              <CommerceLinks mobile />
              <ThemeToggle />
              <AccountActions mobile />
              <p>
                Accounts and role gates are local demonstrations, not production
                authentication.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
