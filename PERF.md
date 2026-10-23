# Performance record

## Deployed-build results

Performance must be recorded from the final HTTPS deployment, not from `next dev`, a cached localhost tab, or a different commit. This checkout currently has no configured Git remote or verified live URL, so deployed scores cannot be truthfully reported yet.

| Lighthouse category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | Not measured—deployment pending | Not measured—deployment pending |
| Accessibility | Not measured—deployment pending | Not measured—deployment pending |
| Best Practices | Not measured—deployment pending | Not measured—deployment pending |
| SEO | Not measured—deployment pending | Not measured—deployment pending |

## Measurement record

| Field | Value |
| --- | --- |
| Live URL | Not available |
| Commit SHA | Not available—repository has no recorded remote/deployment |
| Measurement date | Pending |
| Tool | Chrome Lighthouse navigation report |
| Pages | `/` and `/products` at minimum |
| Runs | Three uncached runs per device profile; record the median |

## How to fill both columns

1. Deploy the exact commit with `npm run build` as the build command.
2. Verify the final HTTPS URL and set `NEXT_PUBLIC_SITE_URL` to that origin.
3. Open the deployed home page in Chrome Incognito with extensions disabled.
4. Run Lighthouse in **Navigation** mode with all four categories selected, first using **Mobile**, then **Desktop**.
5. Repeat each profile three times with a cleared site cache. Record the median score in the table rather than selecting the best run.
6. Repeat for `/products`; if it scores lower, record the lower representative result and note the route.
7. Add the deployment URL, commit SHA, UTC timestamp, Chrome/Lighthouse version, and links or screenshots for the saved reports.

## Build evidence currently available

`npm run build` successfully generates all application routes. Browser checks confirm local images load, core pages avoid horizontal overflow at narrow widths, and no critical console errors remain. These are useful release checks, but they are not substitutes for deployed Lighthouse measurements.
