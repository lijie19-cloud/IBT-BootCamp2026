# Performance record

## Deployed-build results

Live deployment tested: <https://market-hub-neon.vercel.app/>

These scores come from the deployed HTTPS home page, not `next dev` or localhost. Lighthouse 13.0.1 ran three uncached navigation audits per device profile on October 23, 2026; each value is the median of those three runs.

| Lighthouse category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 60 | 42 |
| Accessibility | 96 | 96 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

## Median lab metrics

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| First Contentful Paint | 1.9 s | 1.8 s |
| Largest Contentful Paint | 3.3 s | 2.7 s |
| Total Blocking Time | 1,346 ms | 804 ms |
| Cumulative Layout Shift | 0.000 | 0.000 |
| Speed Index | 4.0 s | 3.9 s |

## Measurement record

| Field | Value |
| --- | --- |
| Live URL | `https://market-hub-neon.vercel.app/` |
| Commit SHA | Not asserted—the deployment does not expose a verified SHA to this checkout |
| Measurement date | 2026-10-23 15:00–15:05 UTC |
| Tool | Lighthouse 13.0.1, Navigation mode, headless Google Chrome |
| Page | `/` |
| Runs | Three mobile and three desktop runs; median reported |

## Interpretation and next work

SEO is excellent and accessibility has a strong baseline, but performance is not release-grade. Total Blocking Time is the largest measured weakness, so reducing client-side JavaScript and hydration work should come before cosmetic micro-optimizations. LCP is the next target, especially on mobile; prioritize the hero path, image delivery, and critical CSS.

The audits also identified insufficient color contrast, a visible-label/accessibility-name mismatch, and browser console errors. Those findings explain the 96 Accessibility and Best Practices scores and should be addressed before treating either category as complete.

Scores vary with Lighthouse throttling, network conditions, and deployment cold starts. Using the median prevents one unusually fast or slow run from becoming the claim. Re-run the same six audits after performance work and attach the deployed commit SHA when Vercel/Git metadata is available.

## Supporting build evidence

`npm run build` successfully generates all application routes. That is useful release evidence, but it is separate from the deployed measurements above: build success proves compilation, while Lighthouse measures the delivered page under a simulated device and network profile.
