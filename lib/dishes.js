export const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Traditional",
    price: 650,
    rating: 4.9,
    description:
      "A beloved Ethiopian specialty traditionally prepared with seasoned minced beef and aromatic spices.",
    ingredients: ["Beef", "Mitmita", "Niter kibbeh"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaV7jzMkjffXy4ifz2Pt7z5NYqhb2E0sDo4GZlH47KQ&s=10",
    popular: true,
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    category: "Traditional",
    price: 550,
    rating: 4.9,
    description:
      "A rich, slow-cooked Ethiopian chicken stew with berbere spices and traditional accompaniments.",
    ingredients: ["Chicken", "Berbere", "Onion", "Egg"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnomLet0KzUXYk6PqjK8B6RD8Q-7w53xIiYuVy9ZZxw&s=10",
    popular: true,
  },
  {
    id: "shiro",
    name: "Shiro",
    category: "Vegetarian",
    price: 280,
    rating: 4.7,
    description:
      "A comforting Ethiopian stew made from ground chickpeas or broad beans and fragrant spices.",
    ingredients: ["Shiro flour", "Onion", "Garlic", "Berbere"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUz21KcYo1q3gHg7qqwIBB4EBDc55mFCdvvSicqefInQ&s=10",
    popular: true,
  },
  {
    id: "tibs",
    name: "Tibs",
    category: "Traditional",
    price: 520,
    rating: 4.8,
    description:
      "Tender pieces of sautéed meat cooked with onion, peppers, and Ethiopian spices.",
    ingredients: ["Beef", "Onion", "Green pepper", "Spices"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_M_PwZVOPA9f4neeu6wtVGs94ze8z_CZqHnhV1u2HQ&s=10",
    popular: false,
  },
  {
    id: "firfir",
    name: "Firfir",
    category: "Breakfast",
    price: 300,
    rating: 4.6,
    description:
      "Pieces of injera mixed with a flavorful, spicy Ethiopian sauce.",
    ingredients: ["Injera", "Berbere", "Onion", "Niter kibbeh"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-40_VGZf727aQwObEo1p5c5NuHTeD2P0I-ael6JYdEg&s=10",
    popular: false,
  },
  {
    id: "beyaynet",
    name: "Beyaynet",
    category: "Vegetarian",
    price: 350,
    rating: 4.8,
    description:
      "A colorful assortment of Ethiopian vegetarian stews served together on injera.",
    ingredients: ["Injera", "Shiro", "Lentils", "Vegetables"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH95_zRV3GlSrcstDvTI2If6gTXMuv35vyMS2pIxr_og&s",
    popular: true,
  },
  {
    id: "misir-wat",
    name: "Misir Wat",
    category: "Vegetarian",
    price: 260,
    rating: 4.6,
    description:
      "A hearty red lentil stew seasoned with traditional Ethiopian berbere spices.",
    ingredients: ["Red lentils", "Berbere", "Onion", "Garlic"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiAvyq3vHC722i9_rbviRRpPov_RbSZ2MnsjPmyllXug&s=10",
    popular: false,
  },
  {
    id: "chechebsa",
    name: "Chechebsa",
    category: "Breakfast",
    price: 240,
    rating: 4.5,
    description:
      "A traditional Ethiopian breakfast made with torn flatbread, spiced butter, and seasoning.",
    ingredients: ["Flatbread", "Berbere", "Spiced butter"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-SMKxBdr361G-3NHzBrqIhjJ6uvOuEuwBgeem9T9OYQ&s=10",
    popular: false,
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}

export function formatPrice(price) {
  return `${price.toLocaleString("en-US")} ETB`;
}
