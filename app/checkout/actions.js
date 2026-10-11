"use server";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createOrder } from "@/lib/orders";
import { dishes } from "@/lib/dishes";

export async function placeOrderAction(formData) {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");
  const raw = String(formData.get("items") || "[]");
  let submitted;
  try {
    submitted = JSON.parse(raw);
  } catch {
    throw new Error("Invalid cart.");
  }
  if (
    !Array.isArray(submitted) ||
    submitted.length < 1 ||
    submitted.length > 30
  )
    throw new Error("Your cart is empty or invalid.");
  // Never trust prices or names from browser storage: rebuild cart lines from server menu data.
  const items = submitted.map((entry) => {
    const dish = dishes.find((item) => item.id === String(entry.id));
    if (!dish) throw new Error("A dish in your cart is no longer available.");
    return {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: Math.max(1, Math.min(20, Number(entry.quantity) || 1)),
    };
  });
  const customer = {
    name: String(formData.get("name") || "")
      .trim()
      .slice(0, 100),
    phone: String(formData.get("phone") || "")
      .trim()
      .slice(0, 30),
    address: String(formData.get("address") || "")
      .trim()
      .slice(0, 250),
  };
  if (!customer.name || !customer.phone || !customer.address)
    throw new Error("Complete all delivery fields.");
  const order = await createOrder(user, items, customer);
  redirect(`/orders/${order.id}?placed=1`);
}
