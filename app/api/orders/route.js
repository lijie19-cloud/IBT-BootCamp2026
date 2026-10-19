import { NextResponse } from "next/server";
import { getDishById } from "../../../lib/dishes";

const DELIVERY_FEES = {
  delivery: 80,
  express: 120,
  pickup: 0,
};

const PAYMENT_METHODS = ["cash", "telebirr", "cbe-birr"];

const PHONE_REGEX = /^(?:\+251|251|0)9\d{8}$/;

export async function POST(request) {
  try {
    const body = await request.json();

    const { customer, items, deliveryMethod, paymentMethod, idempotencyKey } =
      body;

    if (!idempotencyKey || typeof idempotencyKey !== "string") {
      return NextResponse.json(
        { message: "A valid request key is required." },
        { status: 400 },
      );
    }

    if (
      !customer ||
      typeof customer.name !== "string" ||
      customer.name.trim().length < 2
    ) {
      return NextResponse.json(
        { message: "Enter a valid customer name." },
        { status: 400 },
      );
    }

    if (
      typeof customer.phone !== "string" ||
      !PHONE_REGEX.test(customer.phone.trim())
    ) {
      return NextResponse.json(
        { message: "Enter a valid Ethiopian mobile number." },
        { status: 400 },
      );
    }

    if (
      deliveryMethod !== "pickup" &&
      deliveryMethod !== "delivery" &&
      deliveryMethod !== "express"
    ) {
      return NextResponse.json(
        { message: "Choose a valid delivery method." },
        { status: 400 },
      );
    }

    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      return NextResponse.json(
        { message: "Choose a valid demo payment method." },
        { status: 400 },
      );
    }

    if (
      deliveryMethod !== "pickup" &&
      (typeof customer.address !== "string" ||
        customer.address.trim().length < 5)
    ) {
      return NextResponse.json(
        { message: "Enter a complete delivery address." },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return NextResponse.json(
        { message: "Your cart is empty or invalid." },
        { status: 400 },
      );
    }

    const orderItems = [];

    for (const item of items) {
      if (
        !item ||
        typeof item.id !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        return NextResponse.json(
          { message: "One or more cart items are invalid." },
          { status: 400 },
        );
      }

      const dish = getDishById(item.id);

      if (!dish) {
        return NextResponse.json(
          { message: "A selected dish is no longer available." },
          { status: 400 },
        );
      }

      orderItems.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: item.quantity,
        lineTotal: dish.price * item.quantity,
      });
    }

    // Always calculate prices from trusted server-side dish data.
    const subtotal = orderItems.reduce(
      (total, item) => total + item.lineTotal,
      0,
    );

    const deliveryFee = DELIVERY_FEES[deliveryMethod];
    const total = subtotal + deliveryFee;

    const order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "Order received",
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: deliveryMethod === "pickup" ? "" : customer.address.trim(),
        notes:
          typeof customer.notes === "string"
            ? customer.notes.trim().slice(0, 500)
            : "",
      },
      deliveryMethod,
      paymentMethod,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      demo: true,
    };

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unable to create the order. Please try again." },
      { status: 400 },
    );
  }
}
