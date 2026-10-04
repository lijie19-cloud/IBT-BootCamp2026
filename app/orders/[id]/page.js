import { getOrder } from "@/lib/orders-api";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) {
    return (
      <main className="page-container">
        <div className="not-found">
          <span>🍽️</span>

          <h1>Order Not Found</h1>

          <p>We couldn't find order #{id}.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container order-page">
      <div className="page-hero small">
        <span className="section-label">Addis Eats</span>

        <h1>
          Track Your
          <br />
          <span>Order.</span>
        </h1>

        <p>Follow your order status in real time.</p>
      </div>

      <OrderStatus id={id} initialOrder={order} />
    </main>
  );
}
