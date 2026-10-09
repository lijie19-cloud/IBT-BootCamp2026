import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

import { createSession, SESSION_COOKIE, SESSION_DURATION } from "@/lib/session";

import { getSafeRedirect } from "@/lib/redirect";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") || "");

    const next = getSafeRedirect(String(formData.get("next") || "/"));

    if (!email || !password) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const session = await createSession(user.id);

    const response = NextResponse.redirect(new URL(next, request.url));

    response.cookies.set({
      name: SESSION_COOKIE,
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("SIGN IN ERROR:", error);

    return NextResponse.redirect(new URL("/signin", request.url));
  }
}
