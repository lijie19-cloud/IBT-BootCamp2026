import CartView from "@/components/commerce/CartView";

export const metadata = { title: "Cart", description: "Review products in your local MarketHub demo cart." };

export default function CartPage() {
  return <main className="commerce-page"><div className="commerce-heading"><p className="eyebrow">Shopping cart</p><h1>Review your picks.</h1><p>Quantities are checked against the seeded catalog. Cart contents persist only in this browser.</p></div><CartView /></main>;
}
