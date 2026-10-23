# GitHub and Vercel deployment

## Before publishing

1. Run `npm ci`, `npm test`, `npm run lint`, and `npm run build`.
2. Review `git status` and confirm `.env.local`, credentials, database exports, and private files are absent.
3. Create an empty GitHub repository without generated starter files.
4. Connect it to this checkout and push the existing `main` branch:

```bash
git remote add origin https://github.com/YOUR_ACCOUNT/markethub.git
git add .
git commit -m "Build MarketHub marketplace demo"
git push -u origin main
```

Do not run these example commands unchanged until `YOUR_ACCOUNT` is replaced with the real repository owner.

## Vercel dashboard deployment

1. In Vercel, choose **Add New → Project** and import the GitHub repository.
2. Confirm the detected framework is Next.js and leave the root directory as the repository root.
3. The demo needs no secret environment variables. Set `NEXT_PUBLIC_SITE_URL` to the final public origin only if the application starts using it.
4. Deploy and wait for the build to complete.
5. Open the deployment, test the workflows in `docs/TESTING.md`, inspect browser console errors, and verify the security response headers.
6. Future database and authentication secrets belong in Vercel Project Settings → Environment Variables. Configure them separately for Development, Preview, and Production, then redeploy. Never paste secrets into source files or prefix them with `NEXT_PUBLIC_`.

Vercel also supports the CLI sequence `vercel link`, `vercel env pull .env.local`, `vercel deploy`, and `vercel deploy --prod`. See the official [Vercel CLI deployment guide](https://vercel.com/docs/projects/deploy-from-cli) and [environment variable documentation](https://vercel.com/docs/environment-variables).

## Build troubleshooting

- Confirm the deployment uses Node.js 20.9 or newer.
- Delete the generated `.next` directory locally and rebuild when stale artifacts cause filesystem errors.
- Use `npm ci` when `package-lock.json` is present; commit lockfile changes together with dependency changes.
- Check that filename casing matches imports because Linux deployment filesystems are case-sensitive.
- Verify every required environment variable exists in the correct Vercel environment and redeploy after changing variables.
- Inspect the first meaningful build error rather than later cascading messages.
- Reproduce deployment behavior locally with `npm run build` followed by `npm run start`.

The official [Next.js deployment guide](https://nextjs.org/docs/pages/getting-started/deploying) confirms that a Node.js deployment uses the `build` and `start` scripts and supports all Next.js features.
