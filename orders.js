const orders = [
  {
    id: 1,
    customer: "Abebe",
    items: [
      { name: "Coffee Beans", price: 200, qty: 1 }, // 200
      { name: "Sugar", price: 50, qty: 2 }, // 100
    ], // Subtotal: 300, With VAT: 345
  },
  {
    id: 2,
    customer: "Lemlem",
    items: [
      { name: "Teff Flour", price: 400, qty: 2 }, // 800
      { name: "Spices", price: 150, qty: 1 }, // 150
    ], // Subtotal: 950, With VAT: 1092.50
  },
  {
    id: 3,
    customer: "Dawit",
    items: [
      { name: "Shiro Powder", price: 300, qty: 1 }, // 300
      { name: "Cooking Oil", price: 150, qty: 1 }, // 150
    ], // Subtotal: 450, With VAT: 517.50
  },
];

export default orders;
