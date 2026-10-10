import CartClient from "../../components/CartClient";
import { getDishes } from "../lib/dishes";

export const metadata = {
  title: "Your Cart",
  description: "Review your Addis Eats order before checkout.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <main className="container page-shell">
      <div className="page-heading compact-heading">
        <span className="eyebrow">ALMOST READY</span>
        <h1>
          Your cart<span>.</span>
        </h1>
        <p>Take a look at the good things you picked.</p>
      </div>
      <CartClient dishes={getDishes()} />
    </main>
  );
}
