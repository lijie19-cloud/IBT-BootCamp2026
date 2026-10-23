"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { startDemoConversation } from "@/lib/services/messageService";

export default function ContactSellerButton({ product }) {
  const router = useRouter();
  const { user, isReady } = useAuth();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/products/${product.id}`)}`);
      return;
    }
    if (user.role === "seller") {
      router.push("/seller/messages");
      return;
    }
    if (isStarting) return;
    setIsStarting(true);
    setError("");
    const result = await startDemoConversation(user, product);
    if (result.ok) router.push(`/messages/${result.conversation.id}`);
    else {
      setError(result.error);
      setIsStarting(false);
    }
  }

  return <div className="contact-seller-action"><button className="button button-primary" type="button" onClick={handleClick} disabled={!isReady || isStarting}>{isStarting ? "Opening conversation…" : user?.role === "seller" ? "Open seller messages" : "Message seller"}</button>{error && <p className="form-alert error" role="alert">{error}</p>}<small>Local demo only — messages do not sync between users or devices.</small></div>;
}
