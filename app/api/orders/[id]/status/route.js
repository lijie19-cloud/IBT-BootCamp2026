import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getOrderForUser } from "@/lib/orders";
export async function GET(request, { params }) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const order = await getOrderForUser(id, user.id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    id: order.id,
    status: order.status,
    updatedAt: order.updatedAt || order.createdAt,
  });
}
