const title = document.querySelector("#title");
const changeTitleButton = document.querySelector("#change-title");

changeTitleButton.addEventListener("click", () => {
  title.textContent = "Addis Market";

  title.classList.toggle("highlight");
});

const cities = [
  "Addis Ababa",
  "Bahir Dar",
  "Hawassa"
];

const cityList = document.querySelector("#city-list");

cities.forEach((city) => {
  const li = document.createElement("li");

  li.textContent = city;

  cityList.append(li);
});

const button = document.querySelector("#click-button");
const box = document.querySelector("#box");

button.addEventListener("click", (event) => {
  console.log("Button listener");
  console.log("event.target:", event.target);
});

box.addEventListener("click", (event) => {
  console.log("Div listener");
  console.log("event.target:", event.target);
});

const shoppingList = document.querySelector("#shopping-list");

shoppingList.addEventListener("click", (event) => {
  if (event.target.matches(".delete")) {
    const item = event.target.closest("li");

    item.remove();
  }
});

const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();

  if (!value) {
    return;
  }

  const li = document.createElement("li");

  li.textContent = value;

  itemList.append(li);

  input.value = "";
});
