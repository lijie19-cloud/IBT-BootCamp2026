# 🛍️ ShopSphere

ShopSphere is a modern e-commerce web application built with **React** and **Vite**.

The application allows users to browse products, search and filter products, view product details, add products to a shopping cart, manage quantities, and complete a checkout process.

---

## 📌 Project Overview

ShopSphere was created as a React learning project to practice important React concepts and build a real-world shopping application.

The project demonstrates:

- React components
- JSX
- Props
- Reusable components
- State management
- Context API
- React Router
- Dynamic routes
- Query string parameters
- API/data fetching
- Loading and error states
- Controlled forms
- Form validation
- Local storage
- Shopping cart functionality
- Responsive design

---

# 🚀 Features

## 🏠 Home Page

The Home page includes:

- ShopSphere introduction
- Hero section
- Shop Now button
- Explore Categories button
- Product categories
- Featured products
- Promotion section
- View All Products button

Featured products are loaded dynamically from `products.json`.

---

## 🛍️ Products Page

Users can browse all available products.

Each product displays:

- Product image
- Product name
- Category
- Price
- Rating
- View Details button
- Add to Cart button

### Product Search

Users can search for products by name.

### Category Filtering

Products can be filtered by:

- All
- Electronics
- Clothing
- Beauty

The selected category is stored in the URL query string.

Example:

```text
/products?category=Electronics