# 🍽️ Addis Eats

A React-based Ethiopian restaurant menu application.

This project upgrades the Day 28 static menu by loading dishes
from a JSON API using the Fetch API and React `useEffect`.

---

## Features

- React functional components
- Menu data loaded from `public/dishes.json`
- Fetch API
- Loading state
- Error state
- Category filtering
- Refetch when category changes
- Request cancellation with `AbortController`
- Search input
- Automatic search input focus using `useRef`
- Empty state
- Reusable Dish component
- PropTypes
- Responsive design
- Ethiopian Birr (ETB) prices

---

## Project Structure

```text
addis-eats/
│
├── public/
│   └── dishes.json
│
├── src/
│   ├── App.jsx
│   ├── Menu.jsx
│   ├── Dish.jsx
│   ├── DishList.jsx
│   ├── api.js
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── README.md