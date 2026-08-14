const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const list = document.querySelector("#list");
const count = document.querySelector("#count");
// State
const items = [];
// Generate IDs
let nextId = 1;
// Add an item
function addItem(name) {
  const item = {
    id: nextId++,
    name: name,
    done: false,
  };
  items.push(item);
  render();
}
// Render the list
function render() {
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    if (item.done) {
      li.classList.add("done");
    }
    li.innerHTML = `
      <span class="item-name">${item.name}</span>
      <button class="remove" type="button">Remove</button>
    `;
    list.appendChild(li);
  });
  // Count remaining items
  const remaining = items.filter((item) => !item.done).length;
  count.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} remaining`;
}
// Form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = input.value.trim();
  // Validate
  if (name === "") {
    return;
  }
  addItem(name);
  input.value = "";
  input.focus();
});
// Event delegation
list.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) {
    return;
  }
  const id = Number(li.dataset.id);
  // Remove item
  if (event.target.classList.contains("remove")) {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
    }
    render();
    return;
  }
  // Toggle bought state
  const item = items.find((item) => item.id === id);
  if (item) {
    item.done = !item.done;
  }
  render();
});
// Initial render
render();
