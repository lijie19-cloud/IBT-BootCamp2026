import { cart } from "@/lib/cart";

export async function GET() {
  return Response.json(cart);
}

export async function POST(request) {
  try {
    const dish = await request.json();

    if (!dish?.id || !dish?.name) {
      return Response.json(
        {
          message: "Invalid dish",
        },
        {
          status: 400,
        },
      );
    }

    cart.push(dish);

    return Response.json(
      {
        message: "Dish added to cart",
        cart,
      },
      {
        status: 201,
      },
    );
  } catch {
    return Response.json(
      {
        message: "Invalid request body",
      },
      {
        status: 400,
      },
    );
  }
}
