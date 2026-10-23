# Authentication and authorization evidence

Live deployment: <https://market-hub-neon.vercel.app/>

MarketHub deliberately separates what the browser demo can demonstrate from what only a trusted backend can prove. Mock accounts are stored in `localStorage` and the current public profile is stored in `sessionStorage`; therefore, both are useful UI state but neither is authoritative identity.

## Routes

| Route | Intended access | Current gate | What it proves |
| --- | --- | --- | --- |
| `/`, `/products`, `/products/[id]`, `/categories/[slug]` | Public | Public Server Components plus client commerce controls | Guests can browse without identity state; account-only actions prompt for login. Browser-local seller listings join catalog and category results on the same device. |
| `/login`, `/signup`, `/forgot-password` | Public | Validated client forms | Normalization, validation, duplicate-submit prevention, role selection, and safe generic login errors work in the demo. |
| `/profile` | Any signed-in demo user | `AuthGate` | Missing sessions redirect to login and signed-in users can reach shared account UI. |
| `/cart`, `/wishlist`, `/checkout`, `/orders` | Buyer | `AuthGate role="buyer"` plus commerce rules | Buyer-only UI, trusted catalog price lookup, stock/quantity checks, and simulated order idempotency are represented. |
| `/messages`, `/messages/[conversationId]` | Buyer and conversation participant | Buyer gate plus participant predicate | Changing a conversation URL does not reveal a non-participant conversation through the service. |
| `/seller/dashboard`, `/seller/products`, `/seller/products/new` | Seller | Seller gate plus seller service | Buyer/seller separation and seller-only listing creation are represented. |
| `/seller/products/[id]/edit` | Seller and listing owner | Seller gate plus service/repository ownership checks | Replacing a product ID cannot update or delete a listing unless its `seller.id` matches the current demo user. |
| `/seller/messages` | Seller and conversation participant | Seller gate plus participant predicate | Seller inbox access remains limited to conversations containing the current demo user. |

## Authorization layers

| Layer | Responsibility | What the layer proves now | Production replacement |
| --- | --- | --- | --- |
| UI gate | Wait for session hydration, redirect guests and wrong-role users, and avoid rendering protected controls meanwhile. | Normal navigation and protected-page behavior are coherent. | Enforce access before private data is returned through server layouts, route handlers, or server actions. |
| Validation | Normalize emails and constrain roles, product fields, quantities, checkout fields, and messages. | Malformed input is rejected consistently before repository calls. | Repeat the same schemas on every server mutation; database constraints remain authoritative. |
| Security predicates | `hasRole`, `ownsProduct`, `participatesInConversation`, and `canCheckout`. | Policy is explicit, reusable, and covered by automated tests. | Invoke predicates with a server-resolved user, never a user/role supplied by the browser. |
| Service layer | Apply role, ownership, participant, pricing, and stock rules before mutation. | Components do not mutate storage directly. | Server actions or route handlers inside authenticated transactions. |
| Repository layer | Namespace seller data and filter conversations by participant. | Defense in depth exists even in local storage. | PostgreSQL queries containing owner/participant predicates, constraints, and transactions. |
| Session/data layer | `sessionStorage` profile and user-namespaced browser repositories. | Refresh behavior and a complete portfolio workflow work without secrets or a database. | Opaque, expiring `HttpOnly`, `Secure`, `SameSite` cookies; PostgreSQL constraints; audit logs; and rate limits. |

## The three attacks

### 1. Role escalation

**Attack:** A buyer changes browser storage or request fields to claim the `seller` role, then opens a seller route or attempts checkout with the wrong role.

**Demo evidence:** `AuthGate` provides role-aware navigation, while `hasRole`, `canCheckout`, and seller-service checks reject the wrong role. The authorization test suite covers buyer-versus-seller behavior.

**Boundary:** Because the browser owns the demo session and account records, a determined user can rewrite either. Production must resolve role and identity from a server session, ignore client-supplied identity/role values, and authorize every mutation on the server.

### 2. Insecure direct object reference (IDOR)

**Attack:** A seller replaces a product ID in `/seller/products/[id]/edit`, or a user replaces `conversationId` in `/messages/[conversationId]`, hoping to read or mutate another user's data.

**Demo evidence:** Product services and repositories require matching seller ownership. Conversation reads and sends require the current ID to appear in the participant set. Missing and unauthorized demo records produce the same unavailable behavior. Tests cover both ownership and participant rejection.

**Production control:** Query with compound authorization predicates—for example `WHERE id = ? AND seller_id = ?` or an indexed participant join—return a non-enumerating not-found response, and repeat the check inside the write transaction. Never fetch broadly and authorize only in React.

### 3. Stored script injection

**Attack:** A user submits HTML or JavaScript in a product description or message and expects it to execute when another user opens the listing or conversation.

**Demo evidence:** Inputs are length-validated and rendered as ordinary React text. The application does not use `dangerouslySetInnerHTML` for user-generated products or messages. The Content Security Policy further limits script sources.

**Production control:** Continue contextual output encoding, validate decoded uploads and URLs, serve media from controlled storage, avoid arbitrary HTML, and sanitize with a reviewed allowlist only if rich text becomes a requirement. CSP is defense in depth, not the primary sanitizer.

## Verification

Run:

```bash
npm test
```

The authorization tests prove the policy functions reject wrong roles, non-owners, non-participants, and absent users. They do **not** prove server security because the demo has no trusted server identity or private database yet.
