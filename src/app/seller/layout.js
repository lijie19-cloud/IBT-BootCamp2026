import Link from "next/link";

export default function SellerLayout({ children }) {
  return <div className="seller-shell"><aside className="seller-sidebar"><div><p className="eyebrow">Seller workspace</p><strong>MarketHub Studio</strong></div><nav aria-label="Seller navigation"><Link href="/seller/dashboard">Overview</Link><Link href="/seller/products">Products</Link><Link href="/seller/products/new">Add product</Link><Link href="/seller/messages">Messages</Link><Link href="/profile">Seller profile</Link></nav><p>Local demo data is private to this browser, not synchronized or server-authorized.</p></aside><main className="seller-main">{children}</main></div>;
}
