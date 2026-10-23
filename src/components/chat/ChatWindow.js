"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MessageBubble from "./MessageBubble";
import { sendDemoMessage } from "@/lib/services/messageService";
import { MESSAGE_MAX_LENGTH } from "@/lib/validation/messageValidation";

export default function ChatWindow({ initialConversation, user, onConversationChange, showBackLink = false }) {
  const [conversation, setConversation] = useState(initialConversation);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef(null);
  const otherRole = user.role === "seller" ? "buyer" : "seller";
  const other = conversation.participants[otherRole];

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  }, [conversation.messages.length]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSending) return;
    setIsSending(true);
    setStatus({ type: "", message: "" });
    const result = await sendDemoMessage(user, conversation.id, value);
    if (result.ok) {
      setConversation(result.conversation);
      setValue("");
      setStatus({ type: "success", message: "Message saved in this browser." });
      onConversationChange?.(result.conversation);
    } else setStatus({ type: "error", message: result.error });
    setIsSending(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <section className="chat-window" aria-label={`Conversation with ${other.name}`}>
      <header className="chat-header">
        {showBackLink && <Link className="chat-back" href="/messages" aria-label="Back to conversations">←</Link>}
        <Image src={conversation.product.image} alt="" width={48} height={48} />
        <div><strong>{other.name}</strong><Link href={`/products/${conversation.product.id}`}>{conversation.product.name}</Link></div>
        <span className="demo-badge">Local demo</span>
      </header>
      <div className="message-history" aria-live="polite">
        {!conversation.messages.length && <div className="first-message"><span aria-hidden="true">✦</span><strong>Start the conversation</strong><p>Ask about availability, condition, delivery, or another product detail.</p></div>}
        {conversation.messages.map((message) => <MessageBubble message={message} isOwn={message.senderId === user.id} key={message.id} />)}
        <div ref={endRef} />
      </div>
      <form className="message-composer" onSubmit={handleSubmit}>
        <label htmlFor={`message-${conversation.id}`}>Message {other.name}</label>
        <textarea id={`message-${conversation.id}`} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={handleKeyDown} maxLength={MESSAGE_MAX_LENGTH} rows="3" placeholder="Write a message…" disabled={isSending} />
        <div><small>{value.length}/{MESSAGE_MAX_LENGTH} · Enter to send, Shift+Enter for a new line</small><button className="button button-primary" type="submit" disabled={isSending || !value.trim()}>{isSending ? "Sending…" : "Send message"}</button></div>
        {status.message && <p className={`form-alert ${status.type}`} role="status">{status.message}</p>}
      </form>
    </section>
  );
}
