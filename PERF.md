# Addis Eats Performance Decisions

## Server Components

Home, menu and dish pages are Server Components where browser interaction is not required. Initial menu data is available before client-side interaction.

## Client Components

Client Components are limited to menu interaction, cart storage, checkout cart access, navigation state and status polling.

## SWR

SWR is used for interactive search and order-status refresh. The status polling interval is five seconds and receives fallback data from the server.

## Search

Menu search uses a 300 ms debounce to avoid sending a request for each keystroke.

## Images and fonts

Dish photography uses `next/image` with explicit dimensions and alt text. The current stylesheet imports a Google font for convenience; for a fully self-contained production build, use `next/font` and package or optimize owned assets.

## Environment

Session secret and public site URL are configured using environment variables. Do not expose secrets through `NEXT_PUBLIC_*`.
