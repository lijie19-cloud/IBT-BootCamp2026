import WishlistView from "@/components/commerce/WishlistView";
import { getCategories } from "@/lib/services/productService";

export const metadata = { title: "Wishlist", description: "Products saved in your local MarketHub demo wishlist." };

export default async function WishlistPage() {
  const categories = await getCategories();
  return <main className="commerce-page"><div className="commerce-heading"><p className="eyebrow">Wishlist</p><h1>Saved for later.</h1><p>Your wishlist remains on this browser and is never treated as private server data.</p></div><WishlistView categories={categories} /></main>;
}
