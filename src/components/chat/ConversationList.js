import Image from "next/image";
import Link from "next/link";

function formatTime(value) {
  return new Intl.DateTimeFormat("en-ET", { month: "short", day: "numeric" }).format(new Date(value));
}

export default function ConversationList({ conversations, user, basePath = "/messages", selectedId, onSelect }) {
  if (!conversations.length) return <div className="conversation-empty"><span aria-hidden="true">◇</span><strong>No conversations yet</strong><p>Open a product and contact its seller to begin a local demo conversation.</p></div>;

  return (
    <div className="conversation-list" aria-label="Conversations">
      {conversations.map((conversation) => {
        const otherRole = user.role === "seller" ? "buyer" : "seller";
        const other = conversation.participants[otherRole];
        const latest = conversation.messages.at(-1);
        const content = <><Image src={conversation.product.image} alt="" width={54} height={54} /><span className="conversation-list-copy"><span><strong>{other.name}</strong><time dateTime={conversation.updatedAt}>{formatTime(conversation.updatedAt)}</time></span><b>{conversation.product.name}</b><small>{latest?.text ?? "Conversation ready — send the first message."}</small></span></>;
        if (onSelect) return <button className={selectedId === conversation.id ? "is-selected" : ""} type="button" key={conversation.id} onClick={() => onSelect(conversation.id)} aria-pressed={selectedId === conversation.id}>{content}</button>;
        return <Link className={selectedId === conversation.id ? "is-selected" : ""} href={`${basePath}/${conversation.id}`} key={conversation.id}>{content}</Link>;
      })}
    </div>
  );
}
