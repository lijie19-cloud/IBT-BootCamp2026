import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="page-container">
      <div className="page-header">
        <p className="eyebrow">Welcome, {session.name}</p>

        <h1>My Orders</h1>

        <p>View your Addis Eats order history.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h2>No orders yet</h2>

          <p>Start exploring the menu and place your first order.</p>

          <Link href="/menu" className="button">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <Link
              href={`/orders/${order.id}`}
              key={order.id}
              className="order-card"
            >
              <div>
                <h2>Order #{order.id.slice(0, 8)}</h2>

                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <div>
                <strong>{order.total} ETB</strong>

                <span>{order.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
