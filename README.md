# Addis Eats

A beginner-friendly Next.js App Router food-ordering MVP built with JavaScript.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
1. Extract the project folder.
2. Open a terminal inside `addis-eats-complete`.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` (optional for local demo; set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`).
5. Run `npm run dev`.
6. Open http://localhost:3000.

## Features
- Responsive homepage and navigation
- Menu listing and dynamic dish routes
- Dish data stored in `app/lib/dishes.js`
- Browser-persisted cart using localStorage
- Demo checkout form and order confirmation
- Metadata, canonical URLs, Open Graph, JSON-LD, sitemap, and robots.txt

## Important scope notes
This is a working frontend MVP. Dish data is in a JavaScript array, the cart is stored in the visitor's browser, and checkout creates a demo confirmation only. It does not charge payments, persist orders to a database, or implement authentication. Before accepting real orders, connect PostgreSQL/Prisma, add server-side validation and authentication/authorization, and integrate a trusted payment provider.

The example production domain is `https://addiseats.et`. Change `NEXT_PUBLIC_SITE_URL` to your real domain before deployment.
