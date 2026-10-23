# Deliberate future scope

These capabilities were cut from the portfolio release intentionally. The decision keeps the demo honest, reviewable, and safe instead of presenting browser-local behavior as a production marketplace.

## Trusted authentication and PostgreSQL

**Cut:** Database-backed accounts, secure password recovery, email verification, OAuth, server sessions, and durable multi-user records.

**Why:** Implementing identity without an operational database, email provider, secret rotation plan, abuse controls, and deployment ownership would create the appearance of security without its substance. The current repository/service seams and Prisma blueprint make the migration visible without pretending it is complete.

## Real payments and inventory reservation

**Cut:** Card collection, payment intents, refunds, seller payouts, tax calculation, and stock reservation.

**Why:** Payments require legal and operational decisions, webhook verification, idempotent order state machines, inventory transactions, reconciliation, and customer support. A simulated checkout demonstrates the UX and pricing boundary without exposing users or money to an incomplete system.

## Cross-user realtime messaging

**Cut:** WebSockets, push notifications, presence, delivery receipts, moderation, and multi-device history.

**Why:** Realtime transport is the easy part; participant authorization, retention, abuse prevention, blocking/reporting, offline delivery, and privacy are the real product. Local conversations demonstrate the interface and participant policy while keeping the limitation explicit.

## Cross-device catalog publishing and uploads

**Cut:** Database-backed public listings, direct file uploads, image processing, CDN delivery, and moderation before publication.

**Why:** Seller-created listings now join the catalog in the same browser, which is enough to prove the create-to-discovery workflow. Sharing them between users requires authenticated writes and durable storage. Safe media also needs signed requests, MIME and decoded-file validation, size/dimension limits, malware controls, generated object names, lifecycle rules, and moderation; an arbitrary upload endpoint would be a security regression.

## Search infrastructure

**Cut:** Fuzzy search, ranking, synonyms, autocomplete, analytics-driven popularity, and a dedicated search service.

**Why:** Twelve seeded products do not justify operational search infrastructure. Deterministic server-side filtering is easier to inspect and test. Search indexing becomes worthwhile only after the catalog is durable and large enough to measure relevance.

## Admin and marketplace operations

**Cut:** Admin dashboards, seller verification, disputes, returns, moderation queues, commissions, fulfillment, and fraud tooling.

**Why:** These are business-policy systems, not decorative screens. Building them before defining ownership, escalation paths, audit requirements, and legal obligations would add breadth without credible behavior.

## Comprehensive production test suite

**Cut:** Browser E2E tests against real sessions, database integration tests, concurrency tests, load tests, accessibility audits in CI, and security scanning against a deployed environment.

**Why:** The current unit tests target the deterministic validation and authorization policy available today. Backend and deployed-environment tests should be added alongside the systems they can genuinely verify, not as mocks that overstate coverage.

## Performance optimization and continuous evidence

**Cut:** A claim that the current deployed build is already performance-complete, plus continuous Lighthouse budgets in CI.

**Why:** `PERF.md` now records six Lighthouse runs against the live Vercel URL. The median scores expose substantial blocking time and weaker-than-target performance, so the honest next step is reducing hydration and client JavaScript, improving the LCP path, fixing audit findings, and then enforcing budgets against a verified deployment commit—not polishing away the evidence.

## Recommended order

1. PostgreSQL schema and migrations.
2. Trusted authentication and server-side authorization.
3. Database-backed catalog, seller ownership, conversations, cart, and orders.
4. Validated object storage for images.
5. Transactional inventory and payment-provider integration.
6. Realtime messaging, moderation, and operational tooling.
7. Deployed E2E, security, accessibility, load, and performance evidence.

The judgment is deliberate: deepen the trust boundary first, then add money, media, realtime behavior, and operations. That order turns the demo into a marketplace instead of merely adding more screens.
