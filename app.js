// Constants & API configuration
const API = "https://open.er-api.com/v6/latest/ETB";
const KEY = "birrwatch";

// Single Source of Truth
const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

// DOM References
const statusEl = document.querySelector("#status");
const selectEl = document.querySelector("#currency");
const formEl = document.querySelector("#convert-form");
const amountEl = document.querySelector("#amount");
const resultEl = document.querySelector("#result");
const addBtn = document.querySelector("#watch");
const watchUl = document.querySelector("#watchlist");

// 1. Persistence: Save & Load state using localStorage
function save() {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      watchlist: state.watchlist,
      currency: state.currency,
    }),
  );
}

function load() {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (err) {
      console.error("Failed to parse stored state", err);
    }
  }
}

// 2. Fetching Rates from Public API
async function loadRates() {
  statusEl.textContent = "Loading rates...";
  statusEl.className = "loading";

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    state.rates = data.rates;
    statusEl.textContent = "";
    statusEl.className = "";
  } catch (err) {
    statusEl.textContent = "Could not load rates.";
    statusEl.className = "error";
  }
}

// 3. UI Render Functions
function render() {
  const codes = Object.keys(state.rates);
  selectEl.innerHTML = codes
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");

  if (state.currency && codes.includes(state.currency)) {
    selectEl.value = state.currency;
  }

  renderWatchlist();
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = '<li class="empty">No currencies in watchlist yet</li>';
    return;
  }

  watchUl.innerHTML = state.watchlist
    .map((c) => {
      const r = state.rates[c];
      const rateText = r ? `1 ETB = ${r} ${c}` : "Rate unavailable";
      return `<li data-c="${c}">
      <span><strong>${c}</strong>: ${rateText}</span>
      <button class="rm" aria-label="Remove ${c}">Remove</button>
    </li>`;
    })
    .join("");
}
// Convert Form Submission
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const amt = Number(amountEl.value);

  if (isNaN(amt) || amt <= 0) {
    resultEl.textContent = "Enter a valid positive amount.";
    return;
  }

  state.amount = amt;
  state.currency = selectEl.value;
  save();

  const rate = state.rates[state.currency];
  if (rate !== undefined) {
    const out = (amt * rate).toFixed(2);
    resultEl.textContent = `${amt} ETB = ${out} ${state.currency}`;
  } else {
    resultEl.textContent = "Conversion unavailable.";
  }
});

// Add to Watchlist
addBtn.addEventListener("click", () => {
  const selectedCurrency = selectEl.value;
  if (!selectedCurrency) return;

  if (state.watchlist.includes(selectedCurrency)) return;

  state.watchlist.push(selectedCurrency);
  save();
  renderWatchlist();
});
// Remove from Watchlist using Event Delegation
watchUl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const currencyToRemove = e.target.closest("li").dataset.c;
  state.watchlist = state.watchlist.filter((c) => c !== currencyToRemove);
  save();
  renderWatchlist();
});
// Select Dropdown Change Event
selectEl.addEventListener("change", (e) => {
  state.currency = e.target.value;
  save();
});
// 5. App Initialization Entry Point
async function init() {
  load();
  await loadRates();
  render();
}
init();
