export const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Traditional",
    price: 420,
    rating: 4.9,
    time: "20–25 min",
    tag: "Chef's favorite",
    description:
      "A beloved Ethiopian specialty of finely minced beef seasoned with mitmita and niter kibbeh. Served with ayib and greens.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbopAfVSkcvNtTvQ008URk-tsHGOEk-oye_e5VZRvYMA&s=10",
    vegetarian: false,
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    category: "Traditional",
    price: 380,
    rating: 4.9,
    time: "30–35 min",
    tag: "Classic",
    description:
      "Slow-simmered chicken in a rich berbere sauce, served with egg and soft injera.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnomLet0KzUXYk6PqjK8B6RD8Q-7w53xIiYuVy9ZZxw&s=10",
    vegetarian: false,
  },
  {
    id: "beyaynet",
    name: "Beyaynet",
    category: "Vegetarian",
    price: 290,
    rating: 4.8,
    time: "15–20 min",
    tag: "Plant-based",
    description:
      "A colorful assortment of lentils, vegetables, shiro and greens served on fresh injera.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH95_zRV3GlSrcstDvTI2If6gTXMuv35vyMS2pIxr_og&s",
    vegetarian: true,
  },
  {
    id: "tibs",
    name: "Sizzling Tibs",
    category: "Traditional",
    price: 450,
    rating: 4.8,
    time: "20–25 min",
    tag: "Popular",
    description:
      "Tender sautéed beef with onions, peppers, rosemary and Ethiopian spices.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlR1J4jM1zFE85l9HOfKM0Qo1QbpCj2MlBZQrhUh8HeQ&s=10",
    vegetarian: false,
  },
  {
    id: "shiro",
    name: "Shiro Wot",
    category: "Vegetarian",
    price: 220,
    rating: 4.7,
    time: "15–20 min",
    tag: "Comfort food",
    description:
      "Silky chickpea stew blended with aromatic spices and served with fresh injera.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4VRRwYHyCJT2IbAa85PBMZ3ko95zQS8vNa1r9SNLsfg&s=10",
    vegetarian: true,
  },
  {
    id: "firfir",
    name: "Injera Firfir",
    category: "Breakfast",
    price: 210,
    rating: 4.6,
    time: "10–15 min",
    tag: "Breakfast",
    description: "Torn injera tossed in a tangy, gently spiced berbere sauce.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoi1gUKxYqOsmVaZ1qwLV72gxR9tWcjnvjMjSUuYhag&s=10",
    vegetarian: true,
  },
  {
    id: "gomen",
    name: "Gomen Besiga",
    category: "Traditional",
    price: 330,
    rating: 4.7,
    time: "20–25 min",
    tag: "Homestyle",
    description:
      "Slow-cooked collard greens with tender beef and warming spices.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrrHmgzgOAwRBI35nsNizpQY6l9fhRpVmEUzBx7i4hDA&s=10",
    vegetarian: false,
  },
  {
    id: "chechebsa",
    name: "Chechebsa",
    category: "Breakfast",
    price: 180,
    rating: 4.6,
    time: "10–15 min",
    tag: "Morning pick",
    description:
      "Torn flatbread tossed with spiced butter and berbere, traditionally served warm.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBeM9HXNwmbJDsSe5V-wVfELym6fuEPEd0QZoobGu92Q&s=10",
    vegetarian: true,
  },
];

export function getDish(id) {
  return dishes.find((dish) => dish.id === id) ?? null;
}
