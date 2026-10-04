# Addis Eats Data Strategy

## Menu

Key:

`/api/dishes`

Strategy:

Server rendering for initial server-owned data.

Reason:

The initial menu does not require browser-side fetching.

---

## Menu Search

Key:

`/api/dishes?q=${query}`

Strategy:

SWR + 300ms debounce.

Reason:

The request depends on what the user types.

The debounce prevents a network request for every individual keystroke.

---

## Menu Pagination

Key:

`/api/dishes?page=${page}`

Strategy:

SWR + keepPreviousData.

Reason:

The page changes in the browser.

The page number is part of the request and cache key.

The page is also represented in the URL:

`/menu?page=2`

---

## Order Status

Key:

`/api/orders/${id}`

Strategy:

SWR + fallbackData + polling.

Refresh:

5 seconds.

Reason:

Order status can change while the page remains open.

The initial order is rendered by the server.

---

## Cart

Key:

`/api/cart`

Strategy:

TanStack Query + mutation.

Refresh:

After a successful cart mutation.

Reason:

The client cache must reflect the latest cart state.

---

## TanStack Query

Default stale time:

30 seconds.

Garbage collection time:

5 minutes.

`staleTime` controls how long successful data is considered fresh.

`gcTime` controls how long unused cached data remains available.

---

## Architecture

```text
                    ADDIS EATS
                        |
          +-------------+-------------+
          |             |             |
        Menu          Search        Orders
          |             |             |
       Server          SWR           SWR
      Component      debounce       polling
          |             |             |
          +-------------+-------------+
                        |
                   Pagination
                        |
                       SWR
                        |
                      Cart
                        |
                 TanStack Query
                        |
                    Mutation
                        |
                  Invalidate