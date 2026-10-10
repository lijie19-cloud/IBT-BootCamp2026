import CheckoutClient from "../../components/CheckoutClient";

export const metadata = {
  title: "Checkout",
  description: "Enter your delivery details for your Addis Eats order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main className="container page-shell">
      <div className="page-heading compact-heading">
        <span className="eyebrow">ONE LAST STEP</span>
        <h1>
          Checkout<span>.</span>
        </h1>
        <p>Tell us where your order should go.</p>
      </div>
      <CheckoutClient />
    </main>
  );
}
