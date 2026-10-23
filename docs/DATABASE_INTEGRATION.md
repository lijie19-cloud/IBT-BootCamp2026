# PostgreSQL and Prisma integration plan

The file `prisma/schema.prisma` is an inactive production blueprint. No Prisma package or database connection is included in the demo, and the current application does not claim database persistence.

## Migration sequence

1. Provision separate PostgreSQL databases for development, preview, and production.
2. Install `prisma` as a development dependency and `@prisma/client` as a runtime dependency.
3. Set server-only `DATABASE_URL` and, when the provider requires it, `DIRECT_URL`. Never prefix either value with `NEXT_PUBLIC_`.
4. Review the blueprint, add database-level check constraints for positive prices, non-negative stock, positive quantities, and participant inequality, then create the first migration with `prisma migrate dev`.
5. Generate the Prisma client and place its singleton initialization in a server-only module.
6. Implement Prisma repositories with the same service interfaces currently used by the UI. Do not import Prisma into Client Components.
7. Replace mock authentication with a trusted authentication library. Associate its accounts and sessions with the `User` model or add the adapter models required by that library.
8. Seed categories, demo sellers, and products through a dedicated seed command. Remove browser seed initialization from production builds.
9. Move product mutations, messaging, cart synchronization, and checkout behind Server Actions or Route Handlers that validate the server session before calling services.
10. Test migrations against a disposable database and use `prisma migrate deploy` during deployment—not `migrate dev`.

## Transaction requirements

Order creation must run in one transaction. Re-read every product, reject inactive listings, verify the requested quantity, atomically reduce stock, calculate monetary values with `Decimal`, create immutable order-item price snapshots, and create the order using a unique idempotency key. A conflict must return the previously committed order rather than charging or decrementing stock twice.

Conversation creation must derive the seller from the selected product, not from a browser field. Message insertion must first query a conversation where the authenticated user is either the buyer or seller. Product updates and deletes must include `sellerId` in the mutation predicate.

## Image storage

Use a private S3-compatible bucket or managed image service. The server should issue short-lived upload permissions only after authenticating a seller, validate the completed object, save the final object key rather than an arbitrary URL, and serve optimized variants through an allowlisted CDN domain.

## Index rationale

The blueprint indexes catalog status/category/date queries, seller product lists, participant conversation lists, chronological messages, buyer order history, and product references. Unique constraints prevent duplicate emails, duplicate cart/wishlist products, duplicate buyer conversations for the same product, and duplicate order idempotency keys.
