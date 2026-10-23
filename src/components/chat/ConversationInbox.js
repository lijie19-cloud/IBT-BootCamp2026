"use client";

import { useEffect, useState } from "react";
import AuthGate from "@/components/auth/AuthGate";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { getConversationsForUser, getConversationForUser } from "@/lib/services/messageService";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

function InboxContent({ sellerMode = false, initialConversationId = null }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(initialConversationId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const task = window.setTimeout(() => {
      const records = getConversationsForUser(user);
      setConversations(records);
      if (sellerMode && !selectedId && records[0]) setSelectedId(records[0].id);
      setIsLoading(false);
    }, 200);
    return () => window.clearTimeout(task);
  }, [sellerMode, selectedId, user]);

  const selected = selectedId ? getConversationForUser(user, selectedId) : null;

  if (isLoading) return <div className="auth-gate-loading" aria-live="polite"><span className="spinner" aria-hidden="true" />Loading local conversations…</div>;
  if (!sellerMode) return <ConversationList conversations={conversations} user={user} />;

  return (
    <div className="seller-chat-layout">
      <aside><ConversationList conversations={conversations} user={user} selectedId={selectedId} onSelect={setSelectedId} /></aside>
      {selected ? <ChatWindow key={selected.id} initialConversation={selected} user={user} onConversationChange={(updated) => setConversations((current) => current.map((item) => item.id === updated.id ? updated : item))} /> : <EmptyState title="Choose a conversation" description="Select a buyer conversation to read its messages and reply." actionHref="/seller/products" actionLabel="View your products" />}
    </div>
  );
}

export default function ConversationInbox(props) {
  return <AuthGate role={props.sellerMode ? "seller" : "buyer"}><InboxContent {...props} /></AuthGate>;
}
