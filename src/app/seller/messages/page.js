import ConversationInbox from "@/components/chat/ConversationInbox";

export const metadata = { title: "Seller messages", description: "Respond to buyer messages in the local MarketHub demo." };

export default function SellerMessagesPage() {
  return <div><div className="seller-page-heading"><div><p className="eyebrow">Seller messages</p><h1>Help buyers decide.</h1><p>Review product-linked questions and reply. This local demo does not provide live delivery, notifications, or cross-device sync.</p></div></div><ConversationInbox sellerMode /></div>;
}
