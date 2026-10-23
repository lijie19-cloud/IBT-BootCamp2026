import { findProductById } from "@/lib/repositories/productRepository";
import { orderRepository } from "@/lib/repositories/orderRepository";
import { validateCheckout } from "@/lib/validation/checkoutValidation";
import { canCheckout } from "@/lib/security/authorization";

export async function placeDemoOrder(
  user,
  cartItems,
  checkoutValues,
  checkoutKey,
) {
  if (!canCheckout(user))
    return { ok: false, error: "A buyer account is required." };
  const prior = orderRepository.findByCheckoutKey(checkoutKey);
  if (prior) return { ok: true, order: prior };
  const validation = validateCheckout(checkoutValues);
  if (Object.keys(validation.errors).length)
    return { ok: false, errors: validation.errors };
  if (!cartItems.length) return { ok: false, error: "Your cart is empty." };

  const verifiedItems = [];
  for (const item of cartItems) {
    const product = await findProductById(item.product.id);
    if (!product || product.status !== "active")
      return {
        ok: false,
        error: `${item.product.name} is no longer available.`,
      };
    if (
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > product.stock
    )
      return { ok: false, error: `Review the quantity for ${product.name}.` };
    verifiedItems.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
      sellerName: product.seller.name,
    });
  }
  const total = verifiedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  await new Promise((resolve) => window.setTimeout(resolve, 600));
  const order = {
    id: `DEMO-${Date.now().toString(36).toUpperCase()}`,
    checkoutKey,
    buyerId: user.id,
    status: "simulated",
    createdAt: new Date().toISOString(),
    delivery: validation.values,
    items: verifiedItems,
    total,
  };
  return { ok: true, order: orderRepository.create(order) };
}

export function getDemoOrders(user) {
  return canCheckout(user) ? orderRepository.findForBuyer(user.id) : [];
}
