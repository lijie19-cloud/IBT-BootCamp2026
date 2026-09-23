# 🍽️ Addis Eats

Addis Eats is a modern Ethiopian food ordering application built with **Next.js**.

The project demonstrates Next.js **App Router**, file-based routing, dynamic routes, React Context API, cart management, form validation, and responsive UI design.

---

## 🚀 Features

### 🏠 Home Page

- Welcome section for Addis Eats
- Ethiopian food branding
- Navigation to the menu
- Navigation to the shopping cart

### 🍴 Menu

- Displays available Ethiopian dishes
- Shows dish category
- Shows spicy badge when applicable
- Displays price in ETB
- View individual dish details
- Add dishes directly to the cart

### 🛒 Shopping Cart

- View all selected dishes
- Increase quantity
- Decrease quantity
- Remove products
- Automatically calculate subtotal
- Continue shopping
- Proceed to checkout

### 💳 Checkout

- Customer name validation
- Ethiopian phone number validation
- Delivery address validation
- Subtotal calculation
- Delivery fee calculation
- VAT calculation
- Final order total
- Order success message

### 🔗 Dynamic Routes

Individual dishes use a dynamic route:

```text
/menu/[id]