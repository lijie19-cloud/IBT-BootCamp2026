import { messageRepository } from "@/lib/repositories/messageRepository";
import { validateMessage } from "@/lib/validation/messageValidation";
import {
  hasRole,
  participatesInConversation,
} from "@/lib/security/authorization";

function makeId(prefix) {
  const suffix =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${suffix}`;
}

export function getConversationsForUser(user) {
  if (!user) return [];
  return messageRepository.findForParticipant(user.id);
}

export function getConversationForUser(user, conversationId) {
  const conversation = messageRepository.findById(conversationId);
  return participatesInConversation(user, conversation) ? conversation : null;
}

export async function sendDemoMessage(user, conversationId, value) {
  const conversation = messageRepository.findById(conversationId);
  if (!participatesInConversation(user, conversation))
    return { ok: false, error: "You cannot access this conversation." };
  const validation = validateMessage(value);
  if (!validation.ok) return validation;

  await new Promise((resolve) => window.setTimeout(resolve, 350));
  const message = {
    id: makeId("message"),
    senderId: user.id,
    text: validation.value,
    createdAt: new Date().toISOString(),
  };
  const updatedConversation = messageRepository.appendMessage(
    conversationId,
    message,
  );
  return updatedConversation
    ? { ok: true, conversation: updatedConversation }
    : { ok: false, error: "The message could not be saved. Please try again." };
}

export async function startDemoConversation(user, product) {
  if (!user)
    return { ok: false, error: "Log in as a buyer to contact this seller." };
  if (!hasRole(user, "buyer"))
    return {
      ok: false,
      error: "Only buyer accounts can start a product conversation.",
    };
  const existing = messageRepository.findByBuyerAndProduct(user.id, product.id);
  if (existing) return { ok: true, conversation: existing };

  await new Promise((resolve) => window.setTimeout(resolve, 250));
  const now = new Date().toISOString();
  const conversation = {
    id: makeId("conversation"),
    product: { id: product.id, name: product.name, image: product.image },
    participants: {
      buyer: { id: user.id, name: user.fullName },
      seller: { id: product.seller.id, name: product.seller.name },
    },
    updatedAt: now,
    messages: [],
  };
  return { ok: true, conversation: messageRepository.create(conversation) };
}
