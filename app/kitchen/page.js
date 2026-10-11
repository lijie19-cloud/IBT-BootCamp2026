import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrders } from "@/lib/orders";
import { updateStatusAction } from "./actions";
export const metadata = {
  title: "Kitchen dashboard",
  robots: { index: false, follow: false },
};
const statuses = [
  "Received",
  "Preparing",
  "Ready",
  "Out for delivery",
  "Delivered",
  "Cancelled",
];
export default async function KitchenPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/kitchen");
  if (user.role !== "staff")
    return (
      <div className="page-shell">
        <div className="container">
          <div className="empty-state">
            <h1>Staff access only</h1>
            <p>
              Your account does not have permission to manage kitchen orders.
            </p>
          </div>
        </div>
      </div>
    );
  const orders = await getAllOrders();
  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Staff workspace</span>
          <h1>Kitchen dashboard.</h1>
          <p>Review incoming orders and keep customers updated.</p>
        </div>
        {orders.length ? (
          orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div>
                <h3>
                  #{order.id.slice(0, 8).toUpperCase()} · {order.customerName}
                </h3>
                <p>
                  {order.items
                    .map((item) => `${item.name} × ${item.quantity}`)
                    .join(", ")}
                </p>
                <p style={{ marginTop: 8 }}>
                  {order.address} · <strong>{order.total} ETB</strong>
                </p>
                <p style={{ marginTop: 6 }}>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <form
                action={updateStatusAction}
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
              >
                <input type="hidden" name="orderId" value={order.id} />
                <label className="muted" htmlFor={`status-${order.id}`}>
                  Status
                </label>
                <select
                  id={`status-${order.id}`}
                  className="status-select"
                  name="status"
                  defaultValue={order.status}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </form>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <h2>Kitchen is clear</h2>
            <p>New orders will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
