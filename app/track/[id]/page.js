import { notFound } from "next/navigation";
import { demoOrder } from "@/lib/orders";
import TrackingClient from "./TrackingClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: id === demoOrder.id ? `Track ${id}` : "Order not found" };
}

export default async function TrackingPage({ params }) {
  const { id } = await params;
  if (id !== demoOrder.id) notFound();
  return <TrackingClient order={demoOrder} />;
}
