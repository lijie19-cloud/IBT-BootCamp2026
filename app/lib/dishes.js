const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    price: 320,
    category: "Traditional favorites",
    emoji: "🥩",
    // image:
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmdoU818mWr5r-Xvqvo7_p1kfxL8TEN451UhKhlDpTw&s=10",
    summary: "Minced beef seasoned with mitmita and Ethiopian spices.",
    details:
      "A beloved Ethiopian dish prepared with seasoned minced beef. Choose your preferred serving style when ordering.",
    popular: true,
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 450,
    category: "Traditional favorites",
    emoji: "🍗",
    summary: "Slow-cooked spicy chicken stew with rich berbere flavor.",
    details:
      "A classic Ethiopian chicken stew simmered with onions and berbere spices, traditionally served with injera.",
    popular: true,
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 380,
    category: "From the kitchen",
    emoji: "🍲",
    summary: "Sautéed beef with onions, peppers, and Ethiopian spices.",
    details:
      "Tender pieces of beef sautéed with onions, peppers, and aromatic spices for a satisfying meal.",
    popular: true,
  },
  {
    id: "shiro",
    name: "Shiro",
    price: 220,
    category: "Plant-based",
    emoji: "🥘",
    summary: "Comforting chickpea stew seasoned with traditional spices.",
    details:
      "A smooth, warming chickpea stew with garlic and Ethiopian spices. A favorite plant-based option.",
    popular: false,
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    price: 280,
    category: "Plant-based",
    emoji: "🍛",
    summary: "A colorful selection of vegetarian stews served together.",
    details:
      "A colorful combination of plant-based Ethiopian stews served together with injera.",
    popular: false,
  },
  {
    id: "chechebsa",
    name: "Chechebsa",
    price: 180,
    category: "Breakfast",
    emoji: "🫓",
    summary: "Torn flatbread tossed with spiced butter and berbere.",
    details:
      "A traditional Ethiopian breakfast made with torn flatbread, spiced butter, and berbere.",
    popular: false,
  },
];

export function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((dish) => dish.id === id);
}
