import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CheckoutForm from "@/components/CheckoutForm";
export const metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};
export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");
  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">One last step</span>
          <h1>Checkout.</h1>
          <p>Tell us where to bring your order.</p>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}
