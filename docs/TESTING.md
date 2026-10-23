# MarketHub testing guide

## Automated checks

Run these commands after installing dependencies:

```bash
npm test
npm run lint
npm run build
npm run start
```

`npm test` covers authentication, product, catalog, message, and checkout validation plus role, ownership, and conversation-participant predicates. ESLint checks React and Next.js conventions. The production build validates every route and Server/Client Component boundary.

## Manual browser checklist

Use a fresh browser profile when testing seed behavior. Test at approximately 390 px, 768 px, and 1440 px widths.

### Guest

- Open `/`, `/products`, a category, and a product detail page.
- Search, filter by category and price, sort, paginate, and confirm an impossible filter shows an empty state.
- Attempt cart, wishlist, messaging, checkout, profile, and seller routes; confirm protected actions lead to login or the correct role notice.

### Buyer

- Log in with `buyer@markethub.demo` / `Buyer123!`, or register a new buyer.
- Add an in-stock product to cart and wishlist; refresh and confirm both persist.
- Increase and decrease quantity, verify the stock maximum, remove an item, and confirm totals update.
- Start a seller conversation, send with Enter, use Shift+Enter for a new line, and refresh the history.
- Change the conversation ID to an unknown value and confirm no messages are revealed.
- Submit invalid checkout fields, then valid demo delivery details; confirm the button disables while pending.
- Confirm the resulting order is labeled simulated and appears in `/orders`.

### Seller

- Log in with `seller@markethub.demo` / `Seller123!`.
- Create a listing with invalid data and confirm field errors; then create a valid listing.
- Edit and deactivate that listing, refresh the browser, and confirm changes persist.
- Attempt `/seller/products/not-owned/edit` and confirm the listing is unavailable.
- Open seller messages, select both seeded conversations, and send a reply.
- Confirm seller accounts cannot use buyer cart, wishlist, or checkout actions.

### Theme, accessibility, and resilience

- Select light, dark, and system modes; refresh after each and confirm preference persistence.
- Navigate primary controls using only Tab, Shift+Tab, Enter, Space, and Escape.
- Open a delete confirmation, confirm focus enters the dialog, remains trapped, closes with Escape, and returns to the invoking button.
- Verify visible focus, readable validation messages, meaningful headings, and useful empty/loading/error states.
- Test the mobile menu and ensure essential controls do not require hover.

## Backend-dependent tests

The demo cannot prove secure sessions, cross-user authorization, true private messaging, realtime delivery, multi-device synchronization, database transactions, inventory locking, image-upload security, password recovery, email verification, rate limiting, or real payments. Add integration and end-to-end tests for those capabilities only after their trusted backend exists.
