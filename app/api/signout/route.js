import { NextResponse } from "next/server";

import { deleteCurrentSession, SESSION_COOKIE } from "@/lib/session";

export async function POST(request) {
  await deleteCurrentSession();

  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
