# Cart App — Context → Zustand migration

A small routed React app (Home / Shop / Cart / Login) demonstrating the
migration described in the deliverable: cart state moves out of
`CartContext` into a Zustand store with narrow selectors and
persistence, while auth and theme keep their own independent contexts.

## What changed, step by step

1. **`useCart` throws without a provider** — see
   [`legacy/CartContext.before.jsx`](legacy/CartContext.before.jsx) for
   the starting point: one `CartContext` holding cart *and* auth *and*
   theme, wrapped in a `useCart()` hook that throws
   `"useCart must be used within a CartProvider"` if called outside the
   provider tree. That file is reference-only now — nothing in `src/`
   imports it.

2. **Auth and theme split into their own providers** —
   [`src/context/AuthContext.jsx`](src/context/AuthContext.jsx) and
   [`src/context/ThemeContext.jsx`](src/context/ThemeContext.jsx). Each
   has its own `createContext`, its own provider, and its own
   `useAuth`/`useTheme` hook that throws outside its provider, same
   pattern as step 1. Toggling the theme can no longer re-render
   anything that only reads auth, and vice versa — see `App.jsx`, where
   `<AuthProvider>` and `<ThemeProvider>` are nested independently.

3. **Cart rebuilt as a Zustand store** —
   [`src/store/cartStore.js`](src/store/cartStore.js). `items`,
   `addItem`, `remove`, `clear` live in `create(...)`, outside React
   entirely. No provider needed; any component can import the store
   directly.

4. **Every `useCart()` call replaced with a narrow selector** — instead
   of one hook returning the whole cart object, the store exports one
   hook per slice: `useCartCount`, `useCartTotal`, `useCartItem(id)`,
   `useCartItemIds`, plus action hooks `useAddItem` / `useRemoveItem` /
   `useClearCart`. Each component subscribes to exactly the piece it
   renders:
   - `Navbar` → `useCartCount` only
   - `ProductCard` → `useAddItem` only (an action, stable identity)
   - `CartItemRow` → `useCartItem(id)` for its own row
   - `CartTotal` → `useCartTotal`, isolated from the row list

5. **`persist` middleware** — the store is wrapped in
   `persist(..., { name: 'cart-storage' })`, so `items` is mirrored to
   `localStorage` and rehydrated on load. Add dishes, refresh the page,
   the cart is still there. `devtools` is layered on top so the Redux
   DevTools extension shows every `cart/addItem`, `cart/remove`,
   `cart/clear` action as it fires.

6. **Devtools re-render check** — see below.

## Running it

```bash
npm install
npm run dev
```

## Step 6: checking which components re-render

Two ways to see it, use either or both:

**A. On-screen render badges.** Every page and cart-related component
calls `useRenderCount(label)`
([`src/hooks/useRenderCount.js`](src/hooks/useRenderCount.js)), which
prints a small `r<N>` badge in its top-right corner and logs to the
console on every render. Open `/shop`, open the console, and add three
dishes:
- `Navbar`'s badge ticks up each time (count changed) — but only once
  per add, not once per existing cart item.
- The `ProductCard` you clicked does **not** re-render (it only
  subscribes to the `addItem` action, which never changes identity).
- Switch to `/cart`: each `CartItemRow` only ticks up when *its own*
  item's qty changes; adding a second, different dish does not
  re-render the first dish's row. `CartTotal` ticks up on every add,
  since the total changes every time.

**B. React DevTools Profiler.** Install the React DevTools browser
extension, open the Profiler tab, enable "Highlight updates when
components render," then add three dishes from `/shop` while on
`/cart` in a second tab (or split view). You should see the cart-row
components flash only for the row whose quantity actually changed,
`CartTotal` and the `Navbar` badge flash every time, and `ProductCard`
components never flash at all. Compare that against temporarily
swapping a row to `useCartItems()` (the whole array) instead of
`useCartItem(id)` — every row will flash on every add, which is the
before-narrowing behavior.

**C. Redux DevTools (optional).** With the browser extension installed,
open the Redux tab to watch `cart/addItem`, `cart/remove`, `cart/clear`
actions fire in `CartStore` as you interact with the app, and inspect
the state tree/diff after each one.

## Project structure

```
src/
  context/
    AuthContext.jsx   # useAuth — throws outside provider
    ThemeContext.jsx  # useTheme — throws outside provider
  store/
    cartStore.js       # Zustand store: items, addItem, remove, clear
                        # + persist + devtools middleware
                        # + narrow selector hooks
  hooks/
    useRenderCount.js  # dev-only render counter badge
  components/
    Navbar.jsx
    ProductCard.jsx
    CartItemRow.jsx
    CartTotal.jsx
  pages/
    Home.jsx
    Shop.jsx
    CartPage.jsx
    Login.jsx
  App.jsx              # routing + provider tree (auth/theme only)
  main.jsx
legacy/
  CartContext.before.jsx  # pre-migration reference, not imported
```
