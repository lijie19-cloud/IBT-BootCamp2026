# 🍽️ Addis Eats — Ethiopian Food Ordering App

Addis Eats is a React-based Ethiopian food ordering application that allows users to browse traditional Ethiopian dishes, view dish details, add dishes to a shopping cart, and proceed to checkout.

The project demonstrates important React concepts including **React Router, Context API, custom hooks, Zustand state management, protected routes, reusable components, localStorage persistence, and responsive design**.

---

## 📌 Project Overview

**Addis Eats** provides a simple and user-friendly food ordering experience.

Users can:

- Explore the home page
- Browse Ethiopian dishes
- Filter dishes by category
- View individual dish details
- Add dishes to the cart
- Remove dishes from the cart
- Clear the entire cart
- See the total cart price
- Continue shopping after navigation
- Keep cart items after refreshing the browser
- Sign in before accessing checkout
- Toggle between light and dark themes
- Navigate through the application without full page reloads
- View a custom 404 page for invalid routes

---

# ✨ Main Features

## 🏠 Home Page

The home page introduces Addis Eats and provides:

- Welcome section
- Ethiopian food introduction
- Call-to-action buttons
- Feature cards
- Navigation to the menu
- Navigation to the shopping cart

---

## 🍛 Menu Page

The menu page displays Ethiopian dishes in reusable cards.

Each dish contains:

- Dish image
- Dish name
- Category
- Description
- Price
- Add to Cart button

Example dishes include:

| Dish | Category | Price |
|---|---|---:|
| Kitfo | Traditional | 700 ETB |
| Shiro Wot | Vegetarian | 280 ETB |
| Vegetarian Firfir | Vegetarian | 550 ETB |
| Tibs | Traditional | 1220 ETB |

---

# 🔎 Category Filtering

Users can filter dishes based on category.

Available categories include:

- All
- Traditional
- Vegetarian

The menu updates dynamically when the user selects a category.

React state is used to control the selected category.

---

# 📄 Dynamic Dish Details

Each dish has its own dynamic route.

Example:

```text
/menu/1
/menu/2
/menu/3
/menu/4
