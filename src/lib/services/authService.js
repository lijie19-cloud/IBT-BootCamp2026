import {
  clearSession,
  findUserByEmail,
  getSession,
  saveSession,
  saveUser,
  updateUserProfile,
} from "@/lib/repositories/userRepository";
import {
  normalizeEmail,
  validateLogin,
  validateProfile,
  validateSignup,
} from "@/lib/validation/authValidation";

function publicProfile(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    location: user.location || "",
    createdAt: user.createdAt,
  };
}

async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}${password}`);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function loginWithMockAccount(values) {
  const errors = validateLogin(values);
  if (Object.keys(errors).length) return { ok: false, errors };
  const email = normalizeEmail(values.email);
  const user = findUserByEmail(email);
  if (!user) return { ok: false, formError: "Email or password is incorrect." };
  const candidateHash = await hashPassword(values.password, user.salt);
  if (candidateHash !== user.passwordHash)
    return { ok: false, formError: "Email or password is incorrect." };
  const profile = publicProfile(user);
  saveSession(profile);
  return { ok: true, user: profile };
}

export async function registerMockAccount(values) {
  const errors = validateSignup(values);
  if (Object.keys(errors).length) return { ok: false, errors };
  const email = normalizeEmail(values.email);
  if (findUserByEmail(email))
    return {
      ok: false,
      errors: { email: "An account with this email already exists." },
    };
  const salt = window.crypto.randomUUID();
  const user = {
    id: window.crypto.randomUUID(),
    fullName: values.fullName.trim(),
    email,
    role: values.role,
    location: "",
    salt,
    passwordHash: await hashPassword(values.password, salt),
    createdAt: new Date().toISOString(),
  };
  saveUser(user);
  const profile = publicProfile(user);
  saveSession(profile);
  return { ok: true, user: profile };
}

export function restoreMockSession() {
  return getSession();
}

export function signOutMockSession() {
  clearSession();
}

export function updateMockProfile(user, values) {
  const errors = validateProfile(values);
  if (Object.keys(errors).length) return { ok: false, errors };
  const updated = updateUserProfile(user.id, {
    fullName: values.fullName.trim(),
    location: String(values.location || "").trim(),
  });
  const profile = publicProfile(updated);
  saveSession(profile);
  return { ok: true, user: profile };
}
