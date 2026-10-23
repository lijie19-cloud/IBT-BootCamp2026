import { demoUsers } from "@/lib/data/users";

const USERS_KEY = "markethub-demo-users-v1";
const SESSION_KEY = "markethub-demo-session-v1";

function browserOnly() {
  if (typeof window === "undefined")
    throw new Error("The mock user repository is browser-only.");
}

export function getUsers() {
  browserOnly();
  try {
    const stored = window.localStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    window.localStorage.removeItem(USERS_KEY);
  }
  const initialUsers = demoUsers.map((user) => ({ ...user }));
  window.localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  return initialUsers;
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return user;
}

export function updateUserProfile(id, updates) {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("Demo account not found.");
  users[index] = { ...users[index], ...updates };
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users[index];
}

export function findUserByEmail(email) {
  return getUsers().find((user) => user.email === email) || null;
}

export function saveSession(profile) {
  browserOnly();
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(profile));
}

export function getSession() {
  browserOnly();
  try {
    const stored = window.sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    window.sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession() {
  browserOnly();
  window.sessionStorage.removeItem(SESSION_KEY);
}
