import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export default async function OrderDetailsPage({ params }) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const { id } = await params;

  const order = await db.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    notFound();
  }

  if (order.userId !== session.userId) {
    notFound();
  }

  return (
    <main className="page-container">
      <Link href="/orders" className="back-link">
        ← My Orders
      </Link>

      <div className="order-detail">
        <div>
          <p className="eyebrow">Addis Eats</p>

          <h1>Order #{order.id}</h1>

          <p>
            Status: <strong>{order.status}</strong>
          </p>

          <p>
            Total: <strong>{order.total} ETB</strong>
          </p>
        </div>

        <div>
          <h2>Order Items</h2>

          <pre>{JSON.stringify(order.items, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
