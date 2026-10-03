# Addis Eats

Addis Eats is a simple food-ordering application built with Next.js App Router.

The project demonstrates important Next.js concepts including:

- App Router
- File-based routing
- Dynamic routes
- Nested layouts
- Server Components
- Client Components
- Server-side data fetching
- `generateStaticParams`
- Server Actions
- Server-side validation
- Route Handlers
- Loading UI
- Error UI
- Not Found UI
- Next.js Link navigation
- Production builds

---

## Tech Stack

- Next.js
- React
- JavaScript
- JSX
- CSS

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/menu` | Menu |
| `/menu/[id]` | Dynamic dish details |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/api/orders` | Order API |
| `/menu/invalid-id` | Not found behavior |

---

## Project Structure

```text
app/
├── api/
│   └── orders/
│       └── route.js
│
├── cart/
│   └── page.js
│
├── checkout/
│   └── page.js
│
├── menu/
│   ├── [id]/
│   │   └── page.js
│   ├── error.js
│   ├── layout.js
│   ├── loading.js
│   └── page.js
│
├── actions.js
├── globals.css
├── layout.js
├── not-found.js
└── page.js

components/
└── CartClient.jsx

lib/
└── dishes.js

BOUNDARY.md
STRATEGY.md
README.md