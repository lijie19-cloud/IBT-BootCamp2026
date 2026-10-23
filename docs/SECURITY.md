# MarketHub security review

## Current demo boundary

MarketHub currently runs without a trusted backend. Catalog data is bundled with the application, while mock accounts, sessions, seller listings, conversations, cart data, wishlists, and demo orders use browser storage. Anyone with browser access can inspect or change that data. The demo must not be described as production-secure or multi-user.

## Implemented now

- Input normalization and length/range validation cover authentication forms, products, messages, catalog filters, cart quantities, and checkout delivery fields.
- React renders product and message text without executable HTML.
- Seller services and repositories both check the current demo owner before product mutations.
- Conversation reads and sends check participant IDs before returning content.
- Checkout ignores browser-provided prices, reloads catalog records, checks positive integer quantities and stock, and recalculates totals.
- A per-checkout idempotency key prevents duplicate local order creation during repeated submissions.
- Passwords are salted and hashed before browser storage. Plaintext passwords, access tokens, session secrets, and payment details are not stored.
- Security response headers restrict framing, MIME sniffing, permissions, referrers, resource origins, and form destinations.
- Environment files are ignored except for the documented `.env.example`; secret examples do not use `NEXT_PUBLIC_`.

## Simulated—not authoritative

- The session stored in `sessionStorage` is user-interface state, not proof of identity.
- Client route gates, role checks, ownership checks, and participant checks can be bypassed by someone controlling the browser.
- Browser password hashing is educational only. Production password hashing belongs on a trusted server using Argon2id, scrypt, or a trusted authentication provider.
- Cart stock checks do not reserve inventory and local orders do not perform database transactions.
- Messaging is not private between real users, realtime, rate-limited, or synchronized across devices.

## Required production controls

1. Use a maintained authentication library with server-side session validation and secure, HTTP-only, `SameSite=Lax` or stricter cookies. Rotate sessions after login and expire them on sign-out.
2. Resolve the user and role from the server session for every protected page, route handler, server action, and repository operation. Never accept a user ID or role from the request body as authority.
3. Query owned products with both `id` and `sellerId`. Query conversations with a participant predicate. Return the same not-found response for missing and unauthorized records.
4. Validate all request data on the server and enforce matching PostgreSQL types, foreign keys, unique constraints, and check constraints.
5. Create orders in a serializable database transaction: lock or atomically decrement stock, recalculate prices, persist price snapshots, and enforce a unique idempotency key.
6. Add per-IP and per-account throttles for login, signup, password recovery, message sends, image uploads, and checkout attempts.
7. Store uploaded images outside the application filesystem. Validate MIME type, decoded dimensions, size, filename, and authorization; generate new object names and serve through a restricted image domain.
8. Add CSRF protection to cookie-authenticated state changes when the framework/authentication flow does not provide it. Verify `Origin` for sensitive requests.
9. Log authorization failures and sensitive mutations without recording passwords, session values, message contents, or full delivery details.
10. Run dependency, secret, static-analysis, and dynamic security checks in CI. Review the Content Security Policy when third-party services are introduced.

## Sign-out behavior

The demo removes only the session record; browser-local demo data remains intentionally available for later sessions. Production sign-out must invalidate the server session, clear its cookie with identical scope attributes, rotate relevant anti-CSRF state, and avoid cached private responses.
