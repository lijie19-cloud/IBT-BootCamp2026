import { NextResponse } from "next/server";
import { dishes } from "@/lib/dishes";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const perPage = 6;
  const filtered = dishes.filter((dish) =>
    `${dish.name} ${dish.description} ${dish.category}`
      .toLowerCase()
      .includes(q),
  );
  if (searchParams.has("page"))
    return NextResponse.json({
      items: filtered.slice((page - 1) * perPage, page * perPage),
      page,
      total: filtered.length,
    });
  return NextResponse.json(filtered);
}
