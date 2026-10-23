const STORAGE_KEY = "markethub-demo-orders-v1";

function readAll() {
  if (typeof window === "undefined") return [];
  try {
    const records = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

export const orderRepository = {
  findForBuyer(buyerId) {
    return readAll()
      .filter((order) => order.buyerId === buyerId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  findByCheckoutKey(checkoutKey) {
    return readAll().find((order) => order.checkoutKey === checkoutKey) ?? null;
  },
  create(order) {
    const records = readAll();
    records.push(order);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return order;
  },
};
