"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { updateOrderStatus } from "@/lib/orders";
export async function updateStatusAction(formData) {
  const user = await getSession();
  if (!user || user.role !== "staff") throw new Error("Not authorized.");
  const orderId = String(formData.get("orderId") || "");
  const status = String(formData.get("status") || "");
  await updateOrderStatus(orderId, status);
  revalidatePath("/kitchen");
  revalidatePath(`/orders/${orderId}`);
}
