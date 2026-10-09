export function getSafeRedirect(next) {
  if (!next) {
    return "/";
  }

  if (typeof next !== "string") {
    return "/";
  }

  if (!next.startsWith("/")) {
    return "/";
  }

  if (next.startsWith("//")) {
    return "/";
  }

  return next;
}
