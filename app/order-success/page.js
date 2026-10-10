import OrderSuccessClient from "../../components/OrderSuccessClient";

export const metadata = {
  title: "Order Confirmation",
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <main className="container page-shell">
      <OrderSuccessClient />
    </main>
  );
}
