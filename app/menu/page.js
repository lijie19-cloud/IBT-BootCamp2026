import MenuBrowser from "@/components/MenuBrowser";
import { dishes } from "@/lib/dishes";
export const metadata = {
  title: "Menu",
  description:
    "Explore Ethiopian favorites including kitfo, doro wat, tibs, shiro and more at Addis Eats.",
  alternates: { canonical: "/menu" },
};
export default function MenuPage() {
  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Made for your appetite</span>
          <h1>Find your flavor.</h1>
          <p>From timeless Ethiopian classics to plant-based comfort food.</p>
        </div>
        <MenuBrowser initialDishes={dishes} />
      </div>
    </div>
  );
}
