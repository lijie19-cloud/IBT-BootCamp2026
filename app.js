// ADDIS EATS
// Restaurant Menu + Cart Application

const state = {
  menu: [],
  cart: [],
  search: "",
  loading: false,
  error: "",
};
// DOM ELEMENTS

const menuList = document.querySelector("#menu-list");

const cartList = document.querySelector("#cart-list");

const cartTotalElement = document.querySelector("#cart-total");

const cartCountElement = document.querySelector("#cart-count");

const searchInput = document.querySelector("#search");

const statusElement = document.querySelector("#status");

const checkoutForm = document.querySelector("#checkout");

const nameInput = document.querySelector("#name");

const phoneInput = document.querySelector("#phone");

const areaInput = document.querySelector("#area");

const formError = document.querySelector("#form-error");
//phone regex
const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
// ==========================================
// LOCAL STORAGE KEY
// ==========================================

const CART_KEY = "addisEatsCart";

// ==========================================
// LOAD CART FROM LOCAL STORAGE
// ==========================================

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);

    if (!raw) {
      state.cart = [];
      return;
    }

    const savedCart = JSON.parse(raw);

    if (Array.isArray(savedCart)) {
      state.cart = savedCart;
    } else {
      state.cart = [];
    }
  } catch (error) {
    console.error("Could not load cart:", error);

    state.cart = [];
  }
}

// ==========================================
// SAVE CART
// ==========================================

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

// ==========================================
// LOAD MENU DATA
// ==========================================

async function loadMenu() {
  state.loading = true;
  state.error = "";

  render();

  try {
    const response = await fetch("/data/menu.json");

    if (!response.ok) {
      throw new Error("Unable to load the menu.");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Menu data has an invalid format.");
    }

    state.menu = data;
  } catch (error) {
    console.error(error);

    state.error = "Sorry, we could not load the menu. Please try again.";
  } finally {
    state.loading = false;

    render();
  }
}

// ==========================================
// FIND MENU ITEM
// ==========================================

function findMenuItem(id) {
  return state.menu.find((item) => item.id === id);
}

// ==========================================
// FILTER MENU
// ==========================================

function getFilteredMenu() {
  const search = state.search.trim().toLowerCase();

  if (!search) {
    return state.menu;
  }

  return state.menu.filter((item) => {
    return (
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    );
  });
}

// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {
  const existingItem = state.cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    state.cart.push({
      id: id,
      qty: 1,
    });
  }

  saveCart();

  render();
}

// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(id) {
  const cartItem = state.cart.find((item) => item.id === id);

  if (!cartItem) {
    return;
  }

  cartItem.qty++;

  saveCart();

  render();
}

// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(id) {
  const cartItem = state.cart.find((item) => item.id === id);

  if (!cartItem) {
    return;
  }

  cartItem.qty--;

  if (cartItem.qty <= 0) {
    state.cart = state.cart.filter((item) => item.id !== id);
  }

  saveCart();

  render();
}

// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);

  saveCart();

  render();
}

// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {
  return state.cart.reduce((total, cartItem) => {
    const menuItem = findMenuItem(cartItem.id);

    if (!menuItem) {
      return total;
    }

    return total + menuItem.price * cartItem.qty;
  }, 0);
}

// ==========================================
// CALCULATE CART ITEM COUNT
// ==========================================

function calculateCartCount() {
  return state.cart.reduce((total, item) => {
    return total + item.qty;
  }, 0);
}

// ==========================================
// RENDER STATUS
// ==========================================

function renderStatus() {
  if (state.loading) {
    statusElement.textContent = "Loading menu...";

    statusElement.className = "status";

    return;
  }

  if (state.error) {
    statusElement.textContent = state.error;

    statusElement.className = "status error";

    return;
  }

  const filtered = getFilteredMenu();

  if (state.search && filtered.length === 0) {
    statusElement.textContent = "No dishes found.";
  } else {
    statusElement.textContent = "";
  }
}

// ==========================================
// RENDER MENU
// ==========================================

function renderMenu() {
  menuList.innerHTML = "";

  if (state.loading) {
    return;
  }

  if (state.error) {
    return;
  }

  const filteredMenu = getFilteredMenu();

  if (filteredMenu.length === 0) {
    return;
  }

  filteredMenu.forEach((item) => {
    const card = document.createElement("article");

    card.className = "menu-card";

    card.dataset.id = item.id;

    card.innerHTML = `
<img
  src="${item.image}"
  alt="${item.name}"
  class="menu-image"
>

      <h3>${item.name}</h3>

      <p class="category">
        ${item.category}
      </p>

      <p class="description">
        ${item.description}
      </p>

      <div class="card-bottom">

        <span class="price">
          ${item.price.toLocaleString()} ETB
        </span>

        <button
          type="button"
          class="add-btn"
          data-action="add"
          data-id="${item.id}"
          aria-label="Add ${item.name} to cart"
        >
          Add to Cart
        </button>

      </div>
    `;

    menuList.appendChild(card);
  });
}

// ==========================================
// RENDER CART
// ==========================================

function renderCart() {
  cartList.innerHTML = "";

  if (state.cart.length === 0) {
    cartList.innerHTML = `
      <p class="empty-cart">
        Your cart is empty.
        Add a delicious Ethiopian dish!
      </p>
    `;
  } else {
    state.cart.forEach((cartItem) => {
      const menuItem = findMenuItem(cartItem.id);

      if (!menuItem) {
        return;
      }

      const item = document.createElement("article");

      item.className = "cart-item";

      item.dataset.id = menuItem.id;

      const itemTotal = menuItem.price * cartItem.qty;

      item.innerHTML = `

        <div class="cart-item-info">

          <p class="cart-item-name">
            ${menuItem.name}
          </p>

          <p class="cart-item-price">
            ${menuItem.price.toLocaleString()} ETB
            each
            &bull;
            ${itemTotal.toLocaleString()} ETB
          </p>

        </div>


        <div class="cart-controls">

          <button
            type="button"
            class="quantity-btn"
            data-action="decrease"
            data-id="${menuItem.id}"
            aria-label="Decrease ${menuItem.name} quantity"
          >
            −
          </button>


          <span
            class="quantity"
            aria-label="Quantity"
          >
            ${cartItem.qty}
          </span>


          <button
            type="button"
            class="quantity-btn"
            data-action="increase"
            data-id="${menuItem.id}"
            aria-label="Increase ${menuItem.name} quantity"
          >
            +
          </button>

          <button
            type="button"
            class="remove-btn"
            data-action="remove"
            data-id="${menuItem.id}"
            aria-label="Remove ${menuItem.name} from cart"
          >
            Remove
          </button>
        </div>
      `;
      cartList.appendChild(item);
    });
  }
  // Total
  const total = calculateTotal();
  cartTotalElement.textContent = `${total.toLocaleString()} ETB`;
  // Item count
  const count = calculateCartCount();
  cartCountElement.textContent = count === 1 ? "1 item" : `${count} items`;
}
// ==========================================
// MAIN RENDER FUNCTION
// =========================================

function render() {
  renderStatus();
  renderMenu();
  renderCart();
}
//=======================================
//Checkout Validation
//=======================================
function validateCheckout() {
  formError.textContent = "";

  const name = nameInput.value.trim();

  const phone = phoneInput.value.trim();

  // -------------------------
  // Validate name
  // -------------------------

  if (!name) {
    formError.textContent = "Please enter your name.";

    nameInput.focus();

    return false;
  }

  if (name.length < 2) {
    formError.textContent = "Name must be at least 2 characters.";

    nameInput.focus();

    return false;
  }

  // -------------------------
  // Validate phone
  // -------------------------

  if (!phone) {
    formError.textContent = "Please enter your TeleBirr phone number.";

    phoneInput.focus();

    return false;
  }

  if (!ETHIOPIAN_PHONE_REGEX.test(phone)) {
    formError.textContent =
      "Please enter a valid Ethiopian phone number, for example 0912345678.";

    phoneInput.focus();

    return false;
  }

  // -------------------------
  // Validate cart
  // -------------------------

  if (state.cart.length === 0) {
    formError.textContent =
      "Your cart is empty. Please add food before placing your order.";

    return false;
  }

  return true;
}
//=======================================
// Submit Event
//=======================================
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validate everything
  if (!validateCheckout()) {
    return;
  }

  // Get customer information
  const name = nameInput.value.trim();

  const phone = phoneInput.value.trim();

  const area = areaInput.value;

  // Calculate total
  const total = calculateTotal();

  // Show successful order
  formError.className = "error success";

  formError.textContent = `Thank you ${name}! Your order of ${total.toLocaleString()} ETB will be delivered to ${area}.`;

  // Clear cart
  state.cart = [];

  saveCart();

  // Clear form
  checkoutForm.reset();

  // Re-render cart
  render();
});

// ==========================================
// MENU EVENT DELEGATION
// ==========================================
menuList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  if (action === "add") {
    addToCart(id);
  }
});
// =========================================
// CART EVENT DELEGATION
// ==========================================
cartList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  if (action === "increase") {
    increaseQuantity(id);
  } else if (action === "decrease") {
    decreaseQuantity(id);
  } else if (action === "remove") {
    removeFromCart(id);
  }
});

// ==========================================
// LIVE SEARCH
// ==========================================

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});
// ==========================================
// START APPLICATION
// ==========================================
loadCart();
render();
loadMenu();
