import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const ordersFile = path.join(dataDir, "orders.json");

async function readOrders() {
  try {
    return JSON.parse(await readFile(ordersFile, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}
async function writeOrders(orders) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(ordersFile, JSON.stringify(orders, null, 2), "utf8");
}
export async function createOrder(user, items, customer) {
  if (!Array.isArray(items) || !items.length)
    throw new Error("Your cart is empty.");
  const order = {
    id: randomUUID(),
    userId: user.id,
    customerName: customer.name,
    phone: customer.phone,
    address: customer.address,
    items: items.map((item) => ({
      id: String(item.id),
      name: String(item.name),
      price: Number(item.price),
      quantity: Math.max(1, Math.min(20, Number(item.quantity) || 1)),
    })),
    total: items.reduce(
      (sum, item) =>
        sum + Number(item.price) * Math.max(1, Number(item.quantity) || 1),
      0,
    ),
    status: "Received",
    createdAt: new Date().toISOString(),
  };
  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);
  return order;
}
export async function getOrdersFor(userId) {
  return (await readOrders()).filter((order) => order.userId === userId);
}
export async function getOrderForUser(orderId, userId) {
  return (
    (await readOrders()).find(
      (order) => order.id === orderId && order.userId === userId,
    ) ?? null
  );
}
export async function getAllOrders() {
  return readOrders();
}
export async function updateOrderStatus(orderId, status) {
  const allowed = [
    "Received",
    "Preparing",
    "Ready",
    "Out for delivery",
    "Delivered",
    "Cancelled",
  ];
  if (!allowed.includes(status)) throw new Error("Invalid order status.");
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.id === orderId);
  if (index < 0) return null;
  orders[index] = { ...orders[index], status };
  await writeOrders(orders);
  return orders[index];
}
