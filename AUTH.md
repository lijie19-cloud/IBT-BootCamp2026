# Addis Eats Authentication and Authorization

## Session

`lib/session.js` creates and verifies an HMAC-signed session token. The token is stored in an HTTP-only cookie with `sameSite=lax`, a root path, and a configurable `secure` flag. Configure `SESSION_SECRET` with a long random value.

## Demo identity store

`lib/users.js` contains two classroom demo accounts with hard-coded passwords. This is not production-grade authentication. Replace it with a trusted identity store, salted password hashing, rate limiting, and appropriate account management before deployment.

## Middleware

`middleware.js` redirects requests to `/checkout` and `/orders` to sign-in when the session cookie is absent. Middleware is only an early gate; it is not the final authorization boundary.

## Server checks

Checkout and order pages call `getSession()`. Server Actions also verify the session before placing or updating orders. Order details and status API requests are scoped to the authenticated user's ID.

## Staff

The kitchen page and status update Server Action require `user.role === "staff"`. Hiding a link in the UI is not authorization.

## Safe return URL

The sign-in action rejects external URLs, protocol-relative URLs, and backslashes in `next`. Invalid destinations fall back to `/`.

## Important deployment note

This is a learning implementation. Review CSRF protection, session rotation/revocation, rate limiting, password hashing, and durable identity/session storage before a public launch.
