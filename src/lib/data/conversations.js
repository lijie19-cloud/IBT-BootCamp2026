export const conversations = [
  {
    id: "conversation-coffee-demo",
    product: {
      id: "amhara-coffee-001",
      name: "Highland Arabica Coffee",
      image: "/images/products/coffee.svg",
    },
    participants: {
      buyer: { id: "buyer-demo", name: "Mimi Tesfaye" },
      seller: { id: "seller-demo", name: "Aman Roastery" },
    },
    updatedAt: "2026-10-21T15:18:00.000Z",
    messages: [
      {
        id: "message-coffee-1",
        senderId: "buyer-demo",
        text: "Hello! Was this coffee roasted this week?",
        createdAt: "2026-10-21T15:12:00.000Z",
      },
      {
        id: "message-coffee-2",
        senderId: "seller-demo",
        text: "Yes — this batch was roasted on Monday. I can also grind it for a pour-over.",
        createdAt: "2026-10-21T15:18:00.000Z",
      },
    ],
  },
  {
    id: "conversation-speaker-demo",
    product: {
      id: "desk-speaker-009",
      name: "Compact Bluetooth Speaker",
      image: "/images/products/headphones.svg",
    },
    participants: {
      buyer: { id: "buyer-demo", name: "Mimi Tesfaye" },
      seller: { id: "seller-demo", name: "Nova Tech Store" },
    },
    updatedAt: "2026-10-20T10:45:00.000Z",
    messages: [
      {
        id: "message-speaker-1",
        senderId: "buyer-demo",
        text: "Does the speaker include a charging cable?",
        createdAt: "2026-10-20T10:30:00.000Z",
      },
      {
        id: "message-speaker-2",
        senderId: "seller-demo",
        text: "It includes a USB-C cable in the demo listing package.",
        createdAt: "2026-10-20T10:45:00.000Z",
      },
    ],
  },
];
