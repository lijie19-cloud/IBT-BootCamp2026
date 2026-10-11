"use server";
import { redirect } from "next/navigation";
import { setSession, clearSession } from "@/lib/session";
import { verifyCredentials } from "@/lib/users";

function safeNext(value) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    value.includes("://")
  )
    return "/";
  return value;
}
export async function signInAction(formData) {
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNext(String(formData.get("next") || "/"));
  const user = verifyCredentials(phone, password);
  if (!user) redirect(`/signin?error=invalid&next=${encodeURIComponent(next)}`);
  await setSession(user);
  redirect(next);
}
export async function signOutAction() {
  await clearSession();
  redirect("/");
}
