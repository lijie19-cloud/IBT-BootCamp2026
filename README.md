# Addis Eats

A course-scoped Ethiopian food ordering application built with Next.js App Router, React, JavaScript and CSS. This project integrates the Day 45 PDF concepts: server-rendered public menu, client interactions, SWR search and order-status polling, session cookies, route protection, server-side authorization, metadata, sitemap, robots and project documentation.

## Features

- Responsive landing page, menu and dish detail routes
- Search with debounce, category filters and pagination UI
- Browser-persisted demo cart
- Sign-in/sign-out, signed HTTP-only session cookie and safe `next` redirect validation
- Protected checkout and customer orders
- Server-side order ownership checks
- Staff-only kitchen dashboard and status updates
- SWR status polling every five seconds
- Next Image, page metadata, Open Graph, sitemap and robots
- Loading, error and not-found UI

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
```

Set `SESSION_SECRET` in `.env.local` to a random secret at least 32 characters long. For example, generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then run:

```bash
npm run dev
```

Open http://localhost:3000.

## Demo accounts

**Customer**
- Phone: `0911111111`
- Password: `Eats1234!`

**Staff**
- Phone: `0922222222`
- Password: `Kitchen123!`

These accounts are intentionally for local demonstration. The demo user store is not a production identity system.

## Main routes

| Route | Access |
|---|---|
| `/` | Public |
| `/menu` | Public |
| `/menu/[id]` | Public |
| `/cart` | Public |
| `/signin` | Public |
| `/checkout` | Signed-in customer |
| `/orders` | Signed-in customer |
| `/orders/[id]` | Owner only |
| `/kitchen` | Staff only |
| `/api/dishes` | Public menu data |
| `/api/orders/[id]/status` | Signed-in owner only |

## Data and production limitations

This is a learning/demo build, not a live commercial ordering service. Orders are stored in a local JSON file under `data/orders.json` for local development. That is not suitable for serverless or multi-instance production deployment. Replace `lib/orders.js` with your established backend/API before deploying. The demo account credentials are hard-coded for classroom use and must be replaced by a proper user store and password hashing before production.

No real payment is collected. Prices are rebuilt from the server menu when creating an order, rather than trusting browser-supplied prices. Do not use real customer information in the demo.

## Production check

```bash
npm run build
npm run start
```

Test the full flow: menu → dish → cart → sign in → checkout → order details → status polling. Also verify that a customer cannot access kitchen actions and cannot read another user's order.

## Environment variables

See `.env.example`. Never commit `.env.local` or secrets.

## Deploying

Set `SESSION_SECRET`, `COOKIE_SECURE=true`, and `NEXT_PUBLIC_SITE_URL` in the deployment environment. Configure a durable backend for users and orders before production launch. Update the canonical site URL and replace demo content/images with assets you own or are licensed to use.
