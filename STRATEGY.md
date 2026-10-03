# Rendering Strategy

## /

Static

The home page contains mostly static content.

## /menu

Server-rendered menu page.

The page fetches dish data directly on the server.

## /menu/[id]

Prerendered dynamic route.

`generateStaticParams()` provides the known dish IDs.

## /cart

Client-side interactive UI.

The cart contains browser-side state.

Only `CartClient.jsx` needs to be a Client Component.

## /checkout

Server-side form mutation.

The checkout form uses a Server Action to process the order.

## /api/orders

HTTP Route Handler.

This endpoint exists for clients that need an HTTP API.

## Why this architecture?

The application keeps Server Components as the default.

Client Components are introduced only when browser interaction or state is required.