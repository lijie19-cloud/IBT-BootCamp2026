export const MESSAGE_MAX_LENGTH = 1000;

export function validateMessage(value) {
  const text = String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim();
  if (!text) return { ok: false, error: "Write a message before sending." };
  if (text.length > MESSAGE_MAX_LENGTH)
    return {
      ok: false,
      error: `Messages must be ${MESSAGE_MAX_LENGTH} characters or fewer.`,
    };
  return { ok: true, value: text };
}
