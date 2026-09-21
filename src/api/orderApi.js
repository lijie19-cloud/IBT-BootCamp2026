export async function submitOrder(order) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  if (!order?.customer) {
    throw new Error("Order information is missing.");
  }

  return {
    success: true,
    orderId: `AE-${Date.now()}`,
  };
}
