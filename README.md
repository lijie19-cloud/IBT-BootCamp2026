
# Addis Eats — Restaurant Ordering Web App

Addis Eats is a restaurant food-ordering web application built with
Next.js and JavaScript. Customers can browse Ethiopian dishes, add
items to a shopping cart, complete a demo checkout, and follow a
simulated order-tracking timeline.

## Features

- Responsive home page and navigation
- Food menu with search and category filtering
- Dynamic dish detail pages
- Add-to-cart functionality
- Increase, decrease, and remove cart items
- Cart persistence using browser localStorage
- Checkout form with customer and delivery details
- Ethiopian mobile number validation
- Server-side order validation and price calculation
- Order confirmation page with a unique order ID
- Simulated order tracking with five statuses
- About and contact pages
- Loading and not-found interfaces

## Technology Stack

- Next.js App Router
- React
- JavaScript
- CSS
- React Context API
- Browser localStorage
- Next.js Route Handlers

## Getting Started

### Prerequisites

- Node.js compatible with your installed Next.js version
- npm
- Visual Studio Code (recommended)

### Installation

Clone your repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project folder:

```bash
cd addis-eats
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Main Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/menu` | Browse and search dishes |
| `/menu/[id]` | Dish details |
| `/cart` | Shopping cart |
| `/checkout` | Demo checkout |
| `/orders/[id]` | Order confirmation |
| `/track-order/[id]` | Simulated order tracking |
| `/about` | About Addis Eats |
| `/contact` | Contact information |

## Order Workflow

1. Browse the menu.
2. Add dishes to the cart.
3. Update quantities in the cart.
4. Enter customer details at checkout.
5. Select a delivery and demo payment method.
6. Place the order.
7. View the confirmation page.
8. Open the tracking page and simulate status changes.

## Demo Limitations

This project is an educational prototype.

- No real payments are processed.
- Orders are saved in browser localStorage.
- Orders are not shared across devices or browsers.
- Tracking statuses are simulated manually.
- No live GPS or courier integration exists.
- The order API does not provide persistent database storage.
- Browser storage may be deleted by the user.

For production use, integrate a database, persistent idempotency
checks, authentication where needed, secure payment processing,
server-side order storage, and real restaurant/courier workflows.

## Production Build

Run:

```bash
npm run build
npm run start
```

## Deployment

The application can be deployed on Vercel using the project's
GitHub repository.

## License

This project is for educational and demonstration purposes.
