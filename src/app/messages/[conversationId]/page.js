import ConversationPage from "@/components/chat/ConversationPage";

export const metadata = { title: "Conversation", description: "A private local MarketHub demo conversation." };

export default async function MessagePage({ params }) {
  const { conversationId } = await params;
  return <main className="conversation-page"><ConversationPage conversationId={conversationId} /></main>;
}
