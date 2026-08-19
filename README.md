# Birr Watch

Birr Watch is a data-driven single-page web application that displays live exchange rates for the Ethiopian Birr (ETB). It lets users convert currency amounts, track specific currencies in a watchlist, and persists settings across browser reloads using `localStorage`.

---

## Features
* **Live Exchange Rates:** Fetches real-time exchange rates for ETB via a public REST API.
* **Currency Conversion:** Converts specified ETB amounts to target currencies with input validation.
* **Watchlist Management:** Allows adding and deleting target currencies without duplicate entries.
* **Data Persistence:** Preserves watchlist choices and currency selections across reloads using `localStorage`.
* **State & Network States:** Displays dynamic status feedback for loading, success, and error paths.

---

## API Used
* **ExchangeRate-API:** [https://open.er-api.com/v6/latest/ETB](https://open.er-api.com/v6/latest/ETB)
  * **Base Currency:** `ETB`
  * **Response Format:** JSON containing currency rate pairs (e.g., `USD`, `EUR`, `KES`).

---

## Setup & Running
1. Clone or download this project directory.
2. Open `index.html` directly in any standard web browser or run it using a local development server (e.g., VS Code Live Server).

---

## Project Structure
```text
├── index.html   # Markup structure for containers, forms, and lists
├── styles.css   # Styling, layout, and UI state indicators
├── app.js       # App state, API fetch, render loop, event delegation, and storage
└── README.md    # Documentation and usage summary