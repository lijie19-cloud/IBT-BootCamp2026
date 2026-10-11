import CartClient from "@/components/CartClient";
export const metadata = {
  title: "Your Cart",
  robots: { index: false, follow: false },
};
export default function CartPage() {
  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Almost time to eat</span>
          <h1>Your cart.</h1>
          <p>Check your picks before checkout.</p>
        </div>
        <CartClient />
      </div>
    </div>
  );
}
