const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// Add a new row
function addRow(name, price) {
  const li = document.createElement("li");
  li.dataset.price = price;

  // Item information
  const itemInfo = document.createElement("div");
  itemInfo.className = "item-info";
  const itemName = document.createElement("span");
  itemName.textContent = name;
  const itemPrice = document.createElement("span");
  itemPrice.textContent = `${price.toFixed(2)} ETB`;

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "del";
  deleteButton.textContent = "Delete";

  // Build the row
  itemInfo.append(itemName, itemPrice);
  li.append(itemInfo, deleteButton);

  // Add row to list
  list.append(li);
}

// Update total
function updateTotal() {
  let total = 0;

  const rows = list.querySelectorAll("li");

  rows.forEach((row) => {
    total += Number(row.dataset.price);
  });

  totalEl.textContent = `${total.toFixed(2)} ETB`;
}
// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  // Validate both fields
  if (!name || !price || price < 0) {
    return;
  }
  addRow(name, price);
  form.reset();
  updateTotal();
});
// Event delegation
list.addEventListener("click", (e) => {
  // Delete item
  if (e.target.matches(".del")) {
    e.target.closest("li").remove();
    updateTotal();
    return;
  }
  // Toggle bought state
  if (e.target.matches("li")) {
    e.target.classList.toggle("bought");
  }
});
