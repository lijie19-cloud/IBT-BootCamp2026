// SHOP STOCK MANAGEMENT SYSTEM
// STATE
const state = {
  products: [],
  search: "",
  category: "all",
};

// LOCAL STORAGE KEY
const STORAGE_KEY = "shopStockProducts";

// DOM ELEMENTS
const productForm = document.querySelector("#productForm");

const productTableBody = document.querySelector("#productTableBody");

const emptyMessage = document.querySelector("#emptyMessage");

const totalProducts = document.querySelector("#totalProducts");

const totalStock = document.querySelector("#totalStock");

const lowStock = document.querySelector("#lowStock");

const inventoryValue = document.querySelector("#inventoryValue");

const searchInput = document.querySelector("#searchInput");

const categoryFilter = document.querySelector("#categoryFilter");

const clearDataBtn = document.querySelector("#clearDataBtn");

// Modal elements
const editModal = document.querySelector("#editModal");

const closeModalBtn = document.querySelector("#closeModalBtn");

const cancelEditBtn = document.querySelector("#cancelEditBtn");

const editProductForm = document.querySelector("#editProductForm");

const formMessage = document.querySelector("#formMessage");

// LOAD PRODUCTS
function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // Nothing saved yet
    if (!raw) {
      return [];
    }

    const products = JSON.parse(raw);

    // Make sure the saved data is an array
    if (!Array.isArray(products)) {
      return [];
    }

    return products;
  } catch (error) {
    console.error("Could not load products:", error);

    return [];
  }
}
// FORM MESSAGES

function showError(message) {
  formMessage.textContent = message;

  formMessage.className = "form-message error";
}

function showSuccess(message) {
  formMessage.textContent = message;

  formMessage.className = "form-message success";
}

function clearMessage() {
  formMessage.textContent = "";

  formMessage.className = "form-message";
}

// SAVE PRODUCTS
function saveProducts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
  } catch (error) {
    console.error("Could not save products:", error);
  }
}

// CREATE SAMPLE PRODUCTS
function createSampleProducts() {
  return [
    {
      id: crypto.randomUUID(),
      name: "Coca Cola",
      category: "Drinks",
      buyingPrice: 30,
      sellingPrice: 40,
      quantity: 50,
      minStock: 10,
    },

    {
      id: crypto.randomUUID(),
      name: "Shiro",
      category: "Food",
      buyingPrice: 120,
      sellingPrice: 160,
      quantity: 25,
      minStock: 5,
    },

    {
      id: crypto.randomUUID(),
      name: "Potato Chips",
      category: "Snacks",
      buyingPrice: 25,
      sellingPrice: 35,
      quantity: 7,
      minStock: 10,
    },
  ];
}

// INITIALIZE APPLICATION
function init() {
  state.products = loadProducts();

  // Add sample products only when
  // localStorage is completely empty
  if (state.products.length === 0) {
    state.products = createSampleProducts();

    saveProducts();
  }

  render();
}

// GET FILTERED PRODUCTS
function getFilteredProducts() {
  const search = state.search.toLowerCase().trim();

  return state.products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);

    const matchesCategory =
      state.category === "all" || product.category === state.category;

    return matchesSearch && matchesCategory;
  });
}

//GET STOCK STATUS
function getStockStatus(product) {
  if (product.quantity === 0) {
    return {
      text: "Out of Stock",
      className: "out-of-stock",
    };
  }

  if (product.quantity <= product.minStock) {
    return {
      text: "Low Stock",
      className: "low-stock",
    };
  }

  return {
    text: "In Stock",
    className: "in-stock",
  };
}

// FORMAT MONEY
function formatMoney(amount) {
  return `${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ETB`;
}

// RENDER DASHBOARD
function renderDashboard() {
  // Total number of products

  totalProducts.textContent = state.products.length;

  // Total quantity

  const stock = state.products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  totalStock.textContent = stock;

  // Low stock products

  const low = state.products.filter(
    (product) => product.quantity <= product.minStock,
  ).length;

  lowStock.textContent = low;

  // Total inventory value

  const value = state.products.reduce(
    (sum, product) => sum + product.buyingPrice * product.quantity,
    0,
  );

  inventoryValue.textContent = formatMoney(value);
}

// RENDER PRODUCT TABLE
function renderProducts() {
  const products = getFilteredProducts();

  // Clear previous rows

  productTableBody.innerHTML = "";

  // Show empty message

  if (products.length === 0) {
    emptyMessage.style.display = "block";

    return;
  }

  emptyMessage.style.display = "none";

  // Create table rows

  products.forEach((product) => {
    const row = document.createElement("tr");

    const status = getStockStatus(product);

    row.innerHTML = `

            <td>
                <strong>
                    ${product.name}
                </strong>
            </td>

            <td>
                ${product.category}
            </td>

            <td>
                ${formatMoney(product.buyingPrice)}
            </td>

            <td>
                ${formatMoney(product.sellingPrice)}
            </td>

            <td>
                ${product.quantity}
            </td>

            <td>
                ${product.minStock}
            </td>

            <td>
                <span class="status ${status.className}">
                    ${status.text}
                </span>
            </td>

            <td>

                <div class="actions">

                    <button
                        class="stock-btn"
                        data-action="increase"
                        data-id="${product.id}"
                    >
                        + Stock
                    </button>

                    <button
                        class="edit-btn"
                        data-action="edit"
                        data-id="${product.id}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        data-action="delete"
                        data-id="${product.id}"
                    >
                        Delete
                    </button>
                </div>
            </td>
        `;
    productTableBody.appendChild(row);
  });
}

// RENDER EVERYTHING
function render() {
  renderDashboard();

  renderProducts();
}

// SEARCH
searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;

  renderProducts();
});

// CATEGORY FILTER
categoryFilter.addEventListener("change", (event) => {
  state.category = event.target.value;

  renderProducts();
});

// TABLE EVENT DELEGATION
productTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const id = button.dataset.id;

  const action = button.dataset.action;

  if (action === "increase") {
    increaseStock(id);
  }

  if (action === "edit") {
    openEditModal(id);
  }

  if (action === "delete") {
    deleteProduct(id);
  }
});

// INCREASE STOCK
function increaseStock(id) {
  const product = state.products.find((product) => product.id === id);

  if (!product) {
    return;
  }

  product.quantity += 1;

  saveProducts();

  render();
}

// DELETE PRODUCT
function deleteProduct(id) {
  const product = state.products.find((product) => product.id === id);

  if (!product) {
    return;
  }

  const confirmed = confirm(`Delete "${product.name}"?`);

  if (!confirmed) {
    return;
  }

  state.products = state.products.filter((product) => product.id !== id);

  saveProducts();

  render();
}

// CLEAR ALL DATA
clearDataBtn.addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to delete all products?");

  if (!confirmed) {
    return;
  }
  state.products = [];
  localStorage.removeItem(STORAGE_KEY);
  render();
});

//  EDIT MODAL
function openEditModal(id) {
  const product = state.products.find((product) => product.id === id);

  if (!product) {
    return;
  }

  document.querySelector("#editProductId").value = product.id;

  document.querySelector("#editProductName").value = product.name;

  document.querySelector("#editCategory").value = product.category;

  document.querySelector("#editBuyingPrice").value = product.buyingPrice;

  document.querySelector("#editSellingPrice").value = product.sellingPrice;

  document.querySelector("#editQuantity").value = product.quantity;

  document.querySelector("#editMinStock").value = product.minStock;

  editModal.classList.remove("hidden");
}

// CLOSE EDIT MODAL
function closeEditModal() {
  editModal.classList.add("hidden");

  editProductForm.reset();
}
closeModalBtn.addEventListener("click", closeEditModal);
cancelEditBtn.addEventListener("click", closeEditModal);

// SAVE EDITED PRODUCT

editProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = document.querySelector("#editProductId").value;
  const product = state.products.find((product) => product.id === id);
  if (!product) {
    return;
  }
  product.name = document.querySelector("#editProductName").value.trim();
  product.category = document.querySelector("#editCategory").value;
  product.buyingPrice = Number(
    document.querySelector("#editBuyingPrice").value,
  );
  product.sellingPrice = Number(
    document.querySelector("#editSellingPrice").value,
  );
  product.quantity = Number(document.querySelector("#editQuantity").value);
  product.minStock = Number(document.querySelector("#editMinStock").value);
  saveProducts();
  closeEditModal();
  render();
});

//ADD PRODUCT
productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();

  // READ FORM VALUES
  const name = document.querySelector("#productName").value.trim();
  const category = document.querySelector("#category").value;
  const buyingPrice = Number(document.querySelector("#buyingPrice").value);
  const sellingPrice = Number(document.querySelector("#sellingPrice").value);
  const quantity = Number(document.querySelector("#quantity").value);
  const minStock = Number(document.querySelector("#minStock").value);
  // NAME VALIDATION

  if (name.length < 2) {
    showError("Product name must contain at least 2 characters.");

    return;
  }

  // CATEGORY VALIDATION
  if (!category) {
    showError("Please select a category.");
    return;
  }
  // BUYING PRICE VALIDATION
  if (!Number.isFinite(buyingPrice) || buyingPrice <= 0) {
    showError("Buying price must be greater than 0.");

    return;
  }
  // SELLING PRICE VALIDATION
  if (!Number.isFinite(sellingPrice) || sellingPrice <= 0) {
    showError("Selling price must be greater than 0.");
    return;
  }
  // PRICE RELATIONSHIP
  if (sellingPrice < buyingPrice) {
    showError("Selling price cannot be lower than buying price.");
    return;
  }

  // QUANTITY VALIDATION
  if (!Number.isInteger(quantity) || quantity < 0) {
    showError("Quantity must be a whole number and cannot be negative.");
    return;
  }
  // MINIMUM STOCK VALIDATION
  if (!Number.isInteger(minStock) || minStock < 0) {
    showError("Minimum stock must be a whole number and cannot be negative.");

    return;
  }
  // DUPLICATE PRODUCT CHECK
  const duplicate = state.products.some(
    (product) =>
      product.name.toLowerCase().trim() === name.toLowerCase().trim(),
  );
  if (duplicate) {
    showError(`"${name}" already exists in your stock.`);
    return;
  }

  // CREATE PRODUCt
  const product = {
    id: crypto.randomUUID(),
    name: name,
    category: category,
    buyingPrice: buyingPrice,
    sellingPrice: sellingPrice,
    quantity: quantity,
    minStock: minStock,
  };
  // ADD TO STATE
  state.products.push(product);
  saveProducts();
  render();
  productForm.reset();
  showSuccess(`${product.name} was added successfully.`);
});
init();
