# ShopSphere — Online Shopping Application

ShopSphere is a React-based online shopping application that allows users to browse products, search and filter products, view product details, add products to a shopping cart, manage quantities, and complete a checkout process.

The project demonstrates how React can be used to build a modern e-commerce application with reusable components, client-side routing, Context API, and Local Storage.

---

## 🖥️ Project Preview

ShopSphere provides a responsive and user-friendly shopping experience across desktop, tablet, and mobile devices.

### 🏠 Home Page

The home page introduces ShopSphere and provides quick access to featured products, product categories, promotions, and the main navigation.

![ShopSphere Home Page](./screenshots/home-page.png)

### 🛍️ Products Page

Users can browse all available products, search for products, filter products by category, and sort products by price or name.

![ShopSphere Products Page](./screenshots/products-page.png)

### 📦 Product Details

The product details page displays complete product information, including the product image, price, rating, description, quantity selector, related products, and Add to Cart functionality.

![ShopSphere Product Details](./screenshots/product-details.png)

### 🛒 Shopping Cart

The cart allows users to manage product quantities, remove products, view the subtotal, and proceed to checkout.

![ShopSphere Shopping Cart](./screenshots/cart-page.png)

### 💳 Checkout

The checkout page provides customer information fields, delivery information, order summary, delivery fee, and the final order total.

![ShopSphere Checkout](./screenshots/checkout-page.png)

### 📱 Responsive Design

ShopSphere is responsive and adapts its layout to different screen sizes.

| Desktop | Tablet | Mobile |
|---|---|---|
| Full product grid | Flexible product grid | Single-column layout |
| Large product images | Medium product images | Responsive product images |
| Full navigation | Adapted navigation | Mobile-friendly layout |

---

## 🚀 Features

### 🏠 Home Page

- Welcome/introduction section
- Featured products
- Product categories
- Promotional section
- Navigation to major sections of the application

### 🛍️ Products

- Display products in reusable product cards
- Product images
- Product names
- Product categories
- Product prices
- Product ratings
- View Details button
- Add to Cart button
- Responsive product grid

### 🔎 Product Search

Users can search products by:

- Product name
- Product category

Search is case-insensitive.

### 🗂️ Product Filtering

Products can be filtered by category:

- Electronics
- Clothing
- Beauty
- Home
- Accessories

### ↕️ Product Sorting

Products can be sorted by:

- Price: Low to High
- Price: High to Low
- Name: A to Z
- Name: Z to A

### 📦 Product Details

Each product has its own details page containing:

- Product image
- Product name
- Category
- Rating
- Description
- Price
- Quantity selector
- Selected quantity total
- Add to Cart
- Related products

### 🛒 Shopping Cart

The shopping cart allows users to:

- Add products
- Increase quantity
- Decrease quantity
- Remove products
- Clear the entire cart
- View total number of items
- View cart subtotal
- Continue shopping
- Proceed to checkout

### 💾 Local Storage

The shopping cart is saved in the browser's Local Storage.

This means the cart remains available after:

- Page refresh
- Browser navigation
- Returning to the application

### 💳 Checkout

The checkout page includes:

- Customer name
- Email
- Ethiopian phone number
- Delivery address
- City
- Order summary
- Delivery fee
- Grand total
- Form validation
- Order confirmation

A successful order generates an order number and clears the shopping cart.

### 📱 Responsive Design

The application is designed to work on:

- Desktop
- Laptop
- Tablet
- Mobile devices

Product cards and product images automatically adjust to different screen sizes.

### 📞 Contact Page

The application includes a contact page where users can submit their information and message.

### ❌ 404 Page

Invalid routes display a custom "Page Not Found" page.

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Context API
- Local Storage
- JSON

---

## 📁 Project Structure

```text
shopsphere/
│
├── public/
│   ├── images/
│   │   └── product images
│   │
│   └── products.json
│
├── screenshots/
│   ├── home-page.png
│   ├── products-page.png
│   ├── product-details.png
│   ├── cart-page.png
│   └── checkout-page.png
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Categories.jsx
│   │   ├── CategoryProducts.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   │
│   ├── api.js
│   ├── data.js
│   ├── Layout.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
