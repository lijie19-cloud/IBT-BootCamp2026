function formatTime(value) {
  return new Intl.DateTimeFormat("en-ET", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

export default function MessageBubble({ message, isOwn }) {
  return (
    <article className={`message-bubble ${isOwn ? "is-own" : ""}`}>
      <p>{message.text}</p>
      <time dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
    </article>
  );
}
