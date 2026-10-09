"use server";

import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function placeOrder(items) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not signed in");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your cart is empty");
  }

  const menuItemIds = items.map((item) => item.menuItemId);

  const menuItems = await db.menuItem.findMany({
    where: {
      id: {
        in: menuItemIds,
      },
    },
  });

  if (menuItems.length !== items.length) {
    throw new Error("One or more menu items are unavailable");
  }

  let total = 0;

  const trustedItems = items.map((item) => {
    const menuItem = menuItems.find(
      (product) => product.id === item.menuItemId,
    );

    if (!menuItem) {
      throw new Error("Menu item not found");
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Invalid quantity");
    }

    const itemTotal = menuItem.price * quantity;

    total += itemTotal;

    return {
      menuItemId: menuItem.id,

      name: menuItem.name,

      price: menuItem.price,

      quantity,

      total: itemTotal,
    };
  });

  const order = await db.order.create({
    data: {
      userId: session.userId,

      items: trustedItems,

      total,

      status: "PENDING",
    },
  });

  redirect(`/orders/${order.id}`);
}
