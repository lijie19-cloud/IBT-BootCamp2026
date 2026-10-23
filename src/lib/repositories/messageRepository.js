import { conversations as seedConversations } from "@/lib/data/conversations";

const STORAGE_KEY = "markethub-demo-conversations-v1";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readAll() {
  if (typeof window === "undefined") return clone(seedConversations);
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(seedConversations),
      );
      return clone(seedConversations);
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : clone(seedConversations);
  } catch {
    return clone(seedConversations);
  }
}

function writeAll(records) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export const messageRepository = {
  findForParticipant(userId) {
    return readAll()
      .filter((conversation) =>
        Object.values(conversation.participants).some(
          (participant) => participant.id === userId,
        ),
      )
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  findById(conversationId) {
    return (
      readAll().find((conversation) => conversation.id === conversationId) ??
      null
    );
  },

  findByBuyerAndProduct(buyerId, productId) {
    return (
      readAll().find(
        (conversation) =>
          conversation.participants.buyer.id === buyerId &&
          conversation.product.id === productId,
      ) ?? null
    );
  },

  create(conversation) {
    const records = readAll();
    records.push(clone(conversation));
    writeAll(records);
    return clone(conversation);
  },

  appendMessage(conversationId, message) {
    const records = readAll();
    const index = records.findIndex(
      (conversation) => conversation.id === conversationId,
    );
    if (index < 0) return null;
    records[index].messages.push(clone(message));
    records[index].updatedAt = message.createdAt;
    writeAll(records);
    return clone(records[index]);
  },
};
