"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not signed in");
  }

  if (!orderId) {
    throw new Error("Order ID is required");
  }

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== session.userId) {
    throw new Error("You are not allowed to cancel this order");
  }

  const allowedStatuses = ["PENDING", "CONFIRMED"];

  if (!allowedStatuses.includes(order.status)) {
    throw new Error("This order can no longer be cancelled");
  }

  await db.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: "CANCELLED",
    },
  });

  revalidatePath("/orders");

  revalidatePath(`/orders/${order.id}`);

  return {
    success: true,
  };
}
