import { cookies } from "next/headers";
import crypto from "crypto";

import { db } from "./db";

export const SESSION_COOKIE = "session";

export const SESSION_DURATION = 60 * 60 * 24 * 7;

export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId) {
  const token = generateSessionToken();

  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

  await db.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return {
    token,
    expiresAt,
  };
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await db.session.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await db.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return {
    id: session.id,
    userId: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

export async function deleteCurrentSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return;
  }

  await db.session.deleteMany({
    where: {
      token,
    },
  });
}
