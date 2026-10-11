import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrderForUser } from "@/lib/orders";
import OrderStatus from "@/components/OrderStatus";
export const metadata = {
  title: "Order details",
  robots: { index: false, follow: false },
};
export default async function OrderDetailPage({ params }) {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");
  const { id } = await params;
  const order = await getOrderForUser(id, user.id);
  if (!order) notFound();
  return (
    <div className="page-shell">
      <div className="container">
        <p>
          <Link href="/orders" className="text-link">
            ← All orders
          </Link>
        </p>
        <div className="page-heading">
          <span className="eyebrow">Thanks for ordering</span>
          <h1>Order #{order.id.slice(0, 8).toUpperCase()}</h1>
          <p>Placed {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="cart-layout">
          <div>
            <OrderStatus
              orderId={order.id}
              initialOrder={{ status: order.status }}
            />
            <section className="panel" style={{ marginTop: 20 }}>
              <h2>Items</h2>
              {order.items.map((item) => (
                <div className="summary-row" key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <strong>{item.price * item.quantity} ETB</strong>
                </div>
              ))}
              <div className="summary-row total">
                <span>Total</span>
                <span>{order.total} ETB</span>
              </div>
            </section>
          </div>
          <aside className="panel">
            <h2>Delivery details</h2>
            <p>
              <strong>{order.customerName}</strong>
            </p>
            <p className="muted">{order.phone}</p>
            <p className="muted">{order.address}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
