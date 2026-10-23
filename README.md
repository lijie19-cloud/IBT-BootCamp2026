# MarketHub

## Purpose

MarketHub is a responsive JavaScript-only marketplace portfolio application built with the Next.js App Router. It demonstrates a public catalog, mock buyer and seller accounts, seller product management, local buyer–seller messaging, cart and wishlist persistence, and a clearly simulated checkout. The project is intentionally database-free so its UI, architecture, validation, and security boundaries can be reviewed before a production backend is introduced.

## 🌐 Live URL

Visit the deployed application:

 [Deployed-webApp](https://market-hub-neon.vercel.app/)

## 🔗 Project Links

- **Live Website:** [Market-Hub](https://market-hub-neon.vercel.app/)
- **GitHub Repository:** [My git repository link
](https://github.com/lijie19-cloud/IBT-BootCamp2026)
## Milestone status

- [x] Milestone 1 — requirements, architecture, dependencies, and setup
                  — global layout, navigation, footer, and theme system
                  — catalog, filters, search, and product details
                  — demo authentication and roles
                  — seller dashboard and product management
                  — demo buyer–seller messaging
                  — cart, wishlist, checkout, and orders
                  — validation, accessibility, loading, and errors
                  — security review and PostgreSQL preparation
                  — tests and production build pass; GitHub and Vercel deployment remain pending

## Architecture

```text
App Router pages and reusable components
                  ↓
             Services
                  ↓
            Repositories
                  ↓
  Mock data now / PostgreSQL later
```

- `src/app/` contains routes, layouts, and route-specific UI. Components remain Server Components unless they genuinely need browser capabilities.
- `src/components/` contains reusable layout, product, authentication, chat, and UI pieces.
- `src/lib/services/` contains use-case rules, such as checking ownership before updating a product.
- `src/lib/repositories/` is the only layer that knows how data is stored.
- `src/lib/data/` contains seeded, non-sensitive demo records.
- `src/lib/validation/` normalizes and validates untrusted input.
- `src/context/` is reserved for small browser-only state such as theme, demo cart, and mock session display.

## Database-later strategy

UI code calls services, and services call repository interfaces. During the demo, repository implementations read seed files and suitable browser-local data. When PostgreSQL is introduced, those implementations are replaced with Prisma-backed server modules without rewriting product cards, forms, or pages.

Production authentication will use trusted server-side sessions. PostgreSQL constraints, transactions, ownership checks, and server validation will be authoritative. Browser storage will never be treated as identity proof and will never contain passwords, tokens, session secrets, or payment data.

## Setup from a fresh clone

Requirements: Node.js 20.9 or newer and npm.

```bash
git clone <repository-url>
cd markethub
npm install
copy .env.example .env.local
npm run dev
```

On macOS or Linux, use `cp .env.example .env.local` instead of `copy`.

Open `http://localhost:3000`.

```bash
npm run lint
npm test
npm run build
npm run start
```

`npm install` uses the committed lockfile. Do not use VS Code Live Server: this is a Next.js application and must run through `npm run dev` or the production `build`/`start` scripts.

## Environment variables

The current demo runs without secrets. Copy `.env.example` to `.env.local` when you want an explicit local site origin. Never commit `.env.local`.

| Variable | Required now | Exposure | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional/reserved | Browser-visible | Reserved canonical origin for future metadata or absolute links. The current app does not read it. It must never contain secrets. |
| `DATABASE_URL` | No—future backend | Server only | Pooled PostgreSQL connection used by the future application runtime. |
| `DIRECT_URL` | No—future backend | Server only | Direct PostgreSQL connection for migrations when the host requires it. |
| `AUTH_SECRET` | No—future backend | Server only | High-entropy secret for signing or encrypting production sessions. |
| `AUTH_TRUST_HOST` | No—future backend | Server only | Enables trusted-host handling when required by the selected authentication library and deployment. |
| `STORAGE_BUCKET` | No—future backend | Server only | Product-image object-storage bucket name. |
| `STORAGE_ACCESS_KEY_ID` | No—future backend | Server only | Object-storage credential identifier. |
| `STORAGE_SECRET_ACCESS_KEY` | No—future backend | Server only | Object-storage secret credential. |

Only values intentionally safe for every visitor may use the `NEXT_PUBLIC_` prefix.

## Current security boundary

The catalog and demo workflows are functional, but identity, private records, and mutations are browser-local. Mock authentication and client route gates demonstrate intended behavior; they are not trusted security boundaries. Prices and stock come from seed records through repository and service layers, and checkout is simulated without payments. See [AUTH.md](AUTH.md) and [docs/SECURITY.md](docs/SECURITY.md).

## Catalog behavior

Provides 12 seeded listings and five product categories. `/products` accepts normalized `query`, `category`, `minPrice`, `maxPrice`, `sort`, and `page` parameters. The client filter component updates the URL, while the server-side product service performs the actual filtering and sorting. Product and category detail routes are statically generated from service-provided identifiers.

## Demo authentication

Provides buyer and seller registration, login, profile editing, role-aware redirects, and sign-out. Registered passwords are salted and hashed with the browser Web Crypto API before storage; plaintext passwords, tokens, and session secrets are not stored. The visible profile session uses `sessionStorage` and ends when that browser tab session ends.

This remains mock authentication. Browser state can be changed by the person using the browser, so the demo route gate is a user-interface guard rather than a production authorization boundary. Production must use secure HTTP-only cookies, server-side sessions, database-backed accounts, CSRF protections where applicable, rate limits, and server-side role and ownership enforcement.

Demo credentials:

- Buyer: `buyer@markethub.demo` / `Buyer123!`
- Seller: `seller@markethub.demo` / `Seller123!`

## Seller product management

Adds `/seller/dashboard`, `/seller/products`, `/seller/products/new`, and `/seller/products/[id]/edit`. Seller listings are namespaced by the current demo user ID in browser storage. Repository mutations require a matching owner ID before editing, changing status, or deleting a listing.

The seeded seller receives three sample listings. Newly registered sellers start empty. Created and edited listings remain on the current browser and are not added to the server-rendered public catalog. A PostgreSQL implementation will replace this browser repository and must repeat every role and ownership check on the server.

## Demo messaging

Adds `/messages`, `/messages/[conversationId]`, and `/seller/messages`. Buyers can start a product-linked conversation, while the seeded seller can review and answer buyer messages. Messages are validated, limited to 1,000 characters, rendered as plain React text, and saved in this browser through the message repository.

Participant checks in the service prevent the current demo session from reading or sending to an unrelated conversation ID. These client checks are demonstrative, not a production security boundary. A production version must resolve the current user from a secure server session, authorize every read and write on the server, store conversations and messages in PostgreSQL, rate-limit sends, and optionally publish committed messages through WebSockets or a managed realtime service.

## Demo commerce

Adds `/cart`, `/wishlist`, `/checkout`, and `/orders`. Cart storage contains product IDs and quantities only. The commerce and order services reload product records before accepting quantities or calculating totals, so browser-provided prices are ignored. Stock limits and positive integer quantities are checked whenever the cart changes and again during checkout.

Checkout is explicitly simulated: it never asks for card information, processes payment, reserves stock, or contacts a seller. A one-time checkout key prevents duplicate demo order records during a repeated submission in the same form session. Production checkout must perform all pricing, stock, identity, address, and idempotency checks in a server transaction before committing an order.

## Reliability and accessibility

Adds application-wide loading, not-found, route-error, and global-error interfaces. Form controls expose invalid state and linked error descriptions to assistive technology, async forms identify busy state, cart quantity failures produce visible status messages, and keyboard focus is consistently visible.

Confirmation dialogs now move focus inside the dialog, keep Tab navigation contained, close with Escape, prevent background scrolling, and restore focus to the invoking control. Responsive controls retain touch-friendly targets, live regions announce important status changes, and reduced-motion preferences remain respected.

## Production preparation

Adds real HTTP security headers, shared authorization predicates, a complete inactive PostgreSQL/Prisma schema blueprint, server-only environment-variable examples, and written migration guidance. Prisma is intentionally not installed and the demo does not open a database connection.

- Review [the security boundary and production checklist](docs/SECURITY.md).
- Review [the authentication routes, layers, and attack cases](AUTH.md).
- Review [the PostgreSQL and Prisma migration plan](docs/DATABASE_INTEGRATION.md).
- Inspect [the inactive schema blueprint](prisma/schema.prisma).
- Review [the deliberate future scope](FUTURE.md).
- Record verified mobile and desktop deployment results in [PERF.md](PERF.md).

## Testing and deployment

- Follow [the automated and manual testing guide](docs/TESTING.md).
- Follow [the GitHub and Vercel deployment guide](docs/DEPLOYMENT.md).
- GitHub Actions runs tests, lint, and the production build for pushes to `main` and pull requests.

The current demo has no required secrets and no real payment integration. Deployment does not turn browser-local authentication or authorization into production security; complete the backend plan before accepting real users or private data.

## Theme behavior

The navigation theme selector supports light, dark, and system modes. The preference is stored under `markethub-theme`; it contains no sensitive information. A small pre-render script resolves the theme before the page paints to reduce flashing, while `ThemeContext` keeps the interface synchronized with system color-scheme changes.
