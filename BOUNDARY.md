# Server / Client Boundary

## RootLayout

Server Component.

It provides:

- Shared application UI
- Navigation
- Metadata
- Footer

## HomePage

Server Component.

It contains static content and a Next.js Link.

## MenuPage

Server Component.

It reads dish data and renders the menu.

## MenuLayout

Server Component.

It provides navigation for menu categories.

## DishPage

Server Component.

It reads the dynamic route parameter and fetches the selected dish.

## Error

Client Component.

It uses the `reset()` function through a button.

## CartPage

Server Component.

It renders the interactive CartClient component.

## CartClient

Client Component.

It manages interactive cart state with `useState`.

## CheckoutPage

Server Component.

It renders a form that invokes a Server Action.

## Server Action

`app/actions.js`

Runs on the server and validates checkout data.

## Route Handler

`app/api/orders/route.js`

Provides an HTTP endpoint for order creation.