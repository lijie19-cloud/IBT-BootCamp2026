import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/checkout");
  }

  return (
    <main className="page-container">
      <div className="page-header">
        <p className="eyebrow">Checkout</p>

        <h1>Complete Your Order</h1>

        <p>Welcome, {session.name}.</p>
      </div>

      <div className="checkout-card">
        <h2>Your Cart</h2>

        <p>Connect this section to your existing Addis Eats cart state.</p>

        <div className="checkout-actions">
          <Link href="/menu" className="button secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
