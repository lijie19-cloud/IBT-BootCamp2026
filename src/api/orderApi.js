/*
  This function represents the order API request.

  For this learning project, we simulate a server
  request instead of requiring a real backend.

  Later, you can replace this with:

  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
*/

export async function submitOrder(order) {
  /*
    Simulate network delay.
  */
  await new Promise((resolve) => setTimeout(resolve, 1200));

  /*
    Basic safety check.

    In a real application this validation would
    also happen on the backend.
  */
  if (!order || !order.customer) {
    throw new Error("Order information is missing.");
  }

  /*
    The request succeeds.

    Return a fake order response so the component
    can behave like it is communicating with a
    real backend.
  */
  return {
    success: true,

    orderId: `AE-${Date.now()}`,

    message: "Your Addis Eats order has been received.",
  };
}
