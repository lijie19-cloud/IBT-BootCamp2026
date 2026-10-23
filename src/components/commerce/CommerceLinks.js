"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CommerceLinks({ mobile = false }) {
  const { itemCount, wishlist, isReady } = useCart();
  return <div className={mobile ? "mobile-commerce-links" : "commerce-links"}><Link href="/wishlist">Wishlist{isReady && wishlist.length > 0 ? ` (${wishlist.length})` : ""}</Link><Link href="/cart">Cart{isReady && itemCount > 0 ? ` (${itemCount})` : ""}</Link></div>;
}
