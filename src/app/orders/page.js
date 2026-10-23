import OrdersView from "@/components/commerce/OrdersView";

export const metadata = { title: "Demo orders", description: "View simulated MarketHub order history saved in this browser." };

export default async function OrdersPage({ searchParams }) {
  const { confirmed = "" } = await searchParams;
  return <main className="commerce-page"><div className="commerce-heading"><p className="eyebrow">Order history</p><h1>Your demo orders.</h1><p>These records are browser-local demonstrations and do not represent real purchases or payments.</p></div><OrdersView confirmed={String(confirmed)} /></main>;
}
