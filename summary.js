import { withVat, format, total } from "./pricing.js";
import orders from "./orders.js";

// Use map + spread to attach a total field to each order
const processedOrders = orders.map((order) => {
  const itemsSubtotal = total(order.items);
  const orderTotalWithVat = withVat(itemsSubtotal);

  return {
    ...order,
    total: orderTotalWithVat,
  };
});

// Uses filter to list only orders over 500 ETB
const largeOrders = processedOrders.filter((order) => order.total > 500);

// Calculates the grand total of all orders
const grandTotal = processedOrders.reduce((sum, order) => sum + order.total, 0);

// Prints the formatted summary
console.log("=== Addis Market Order Summary ===\n");

processedOrders.forEach((order) => {
  console.log(`Order #${order.id} (${order.customer}): ${format(order.total)}`);
});

console.log("\n=== Orders Over 500 ETB ===");
largeOrders.forEach((order) => {
  console.log(`Order #${order.id} qualifies with ${format(order.total)}`);
});

console.log("\n==================================");
console.log(`GRAND TOTAL: ${format(grandTotal)}`);
console.log("==================================");
