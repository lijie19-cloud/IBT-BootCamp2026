"use client";

import { useEffect, useState } from "react";
import AuthGate from "@/components/auth/AuthGate";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { getConversationForUser } from "@/lib/services/messageService";
import ChatWindow from "./ChatWindow";

function ConversationContent({ conversationId }) {
  const { user } = useAuth();
  const [state, setState] = useState({ loading: true, conversation: null });

  useEffect(() => {
    const task = window.setTimeout(() => setState({ loading: false, conversation: getConversationForUser(user, conversationId) }), 150);
    return () => window.clearTimeout(task);
  }, [conversationId, user]);

  if (state.loading) return <div className="auth-gate-loading" aria-live="polite"><span className="spinner" aria-hidden="true" />Checking conversation access…</div>;
  if (!state.conversation) return <EmptyState title="Conversation unavailable" description="This conversation does not exist or your demo account is not a participant. Changing the URL does not reveal its messages." actionHref="/messages" actionLabel="Back to conversations" />;
  return <ChatWindow initialConversation={state.conversation} user={user} showBackLink />;
}

export default function ConversationPage({ conversationId }) {
  return <AuthGate role="buyer"><ConversationContent conversationId={conversationId} /></AuthGate>;
}
