import ConversationInbox from "@/components/chat/ConversationInbox";

export const metadata = { title: "Messages", description: "View your local MarketHub demo conversations." };

export default function MessagesPage() {
  return <main className="messages-page"><div className="messages-heading"><p className="eyebrow">Buyer inbox</p><h1>Your conversations</h1><p>Messages are saved only in this browser. This demo is not real-time and does not connect separate users or devices.</p></div><ConversationInbox /></main>;
}
