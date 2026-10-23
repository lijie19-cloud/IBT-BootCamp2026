import CheckoutForm from "@/components/commerce/CheckoutForm";

export const metadata = {
  title: "Simulated checkout",
  description: "Complete a clearly simulated MarketHub checkout.",
};

export default function CheckoutPage() {
  return (
    <main className="commerce-page">
      <div className="commerce-heading">
        <p className="eyebrow">Simulated checkout</p>
        <h1>Confirm demo delivery.</h1>
        <p>
          This portfolio workflow creates a local order record only. It does not
          charge money or contact a seller.
        </p>
      </div>
      <CheckoutForm />
    </main>
  );
}
