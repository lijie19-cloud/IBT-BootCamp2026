import Link from "next/link";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AccountActions from "@/components/auth/AccountActions";
import CommerceLinks from "@/components/commerce/CommerceLinks";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/#top" aria-label="MarketHub home">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span>MarketHub</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/categories/fashion">Fashion</Link>
          <Link href="/categories/home-living">Home & Living</Link>
        </nav>
        <div className="nav-actions">
          <CommerceLinks />
          <ThemeToggle compact />
          <AccountActions />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
