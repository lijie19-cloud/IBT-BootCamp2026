# 🍽️ Addis Eats — Resilient & Fast React Application

A modern food-ordering application built with **React, React Router, Zustand, React Suspense, React Profiler, Error Boundaries, and React Portals**.

This phase focuses on making the application more **resilient, performant, and accessible**.

---

## 📌 Project Overview

**Addis Eats** is a React-based food ordering application where users can:

- Browse dishes
- Filter dishes
- View dish details
- Add dishes to the cart
- Manage cart items
- Navigate between application routes
- Sign in before checkout
- Complete checkout
- View the order receipt
- Open dish information in a modal
- Continue using the application even when an individual section fails

This phase improves the application by adding:

- Error Boundaries
- Lazy-loaded routes
- Suspense loading states
- React Profiler optimization
- Zustand narrow selectors
- Render optimization
- React Portals
- Keyboard accessibility
- Focus restoration

---

## 🚀 Technologies Used

- React
- Vite
- JavaScript
- JSX
- CSS
- React Router
- Zustand
- Zustand Persist Middleware
- React.lazy
- React Suspense
- React Profiler
- React Portals
- Local Storage

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── CartPanel.jsx
│   ├── Dish.jsx
│   ├── DishList.jsx
│   ├── DishModal.jsx
│   ├── ErrorBoundary.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── LoadingSkeleton.jsx
│   └── Menu.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── MenuPage.jsx
│   ├── DishDetail.jsx
│   ├── Checkout.jsx
│   ├── Receipt.jsx
│   └── NotFound.jsx
│
├── store/
│   └── cartStore.js
│
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── App.jsx
├── main.jsx
└── index.css
