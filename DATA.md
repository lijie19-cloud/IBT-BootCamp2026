# Addis Eats Data Architecture

## Initial public data

The initial menu and dish details are served from `lib/dishes.js` in Server Components. This keeps the first menu render server-driven.

## API

`app/api/dishes/route.js` exposes the demo menu. The client menu browser uses SWR for debounced search. The route supports a page parameter for API pagination, while the UI currently paginates the filtered local menu.

## Cart

The cart is stored in browser `localStorage`, because cart interaction is browser-side state. This is only a demo convenience; the server revalidates dish IDs and prices before order creation.

## Orders

`lib/orders.js` uses a local JSON file to make the demo work without a separate backend. It is appropriate only for local learning. Replace it with the existing course API or a durable database-backed service before deploying.

## Status polling

The order page receives initial status from server data. `components/OrderStatus.js` uses SWR with a five-second refresh interval to fetch updates from the status route.

## Pagination and debounce

Menu search waits 300 ms after typing. The API accepts `q` and `page` parameters. The interface keeps previous SWR results while new search data loads.
