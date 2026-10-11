import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/orders";
export const metadata = {
  title: "My Orders",
  robots: { index: false, follow: false },
};
export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");
  const orders = await getOrdersFor(user.id);
  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Your food journey</span>
          <h1>My orders.</h1>
          <p>Every order, all in one place.</p>
        </div>
        {orders.length ? (
          orders.map((order) => (
            <Link
              href={`/orders/${order.id}`}
              className="order-card"
              key={order.id}
            >
              <div>
                <h3>Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                <p>
                  {new Date(order.createdAt).toLocaleString()} ·{" "}
                  {order.items.length} item types · {order.total} ETB
                </p>
              </div>
              <span className="status-pill">{order.status}</span>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <h2>No orders yet</h2>
            <p>Your next favorite meal is waiting.</p>
            <Link href="/menu" className="btn btn-primary">
              Explore menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
