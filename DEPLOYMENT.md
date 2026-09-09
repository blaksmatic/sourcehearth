# Production deployment

SourceHearth deploys to Cloudflare Workers on `sourcehearth.com` and `www.sourcehearth.com`. The GitHub workflow is `.github/workflows/validate.yml`.

## One-time credential setup

Create a Cloudflare API token at https://dash.cloudflare.com/profile/api-tokens with:

- Account / Workers Scripts / Edit
- Account / D1 / Edit
- Zone / Workers Routes / Edit
- Zone / Zone / Read

Restrict account resources to the account that owns SourceHearth and zone resources to `sourcehearth.com`. Store it as the repository Actions secret `CLOUDFLARE_API_TOKEN` at https://github.com/blaksmatic/sourcehearth/settings/secrets/actions/new. Never commit it or paste it into a pull request.

The account ID and D1 database ID in `deploy/cloudflare.json` are identifiers, not credentials. The production database `sourcehearth-production` has already been created. GitHub cannot deploy until the token secret is configured.

## What happens after a push

1. Pull requests and pushes validate every game listing, check TypeScript, and build the site.
2. The build produces a separate production Wrangler config and a commit revision marker.
3. Wrangler validates the bundle without uploading it, and applies migrations to a fresh local database.
4. On `main` only, the tested build is passed to a serialized production job. Superseded commits are skipped.
5. The job checks for its credential, applies pending D1 migrations, and deploys the Worker, static files, and custom domains.
6. A health check verifies that the homepage responds, the feedback table is queryable, and the live revision matches the triggering commit.

Forked PRs never receive the Cloudflare token and cannot run the production job. Deployment credentials are available only in the steps that need them. Builds are retained for seven days.

## First run and retries

After adding the secret, rerun the failed deployment job in GitHub Actions or run `Validate and deploy SourceHearth` from the Actions tab on `main`. A successful run exposes the site publicly on the configured custom domains. Initial DNS and certificate provisioning may take longer than the health-check window; retry the workflow after provisioning completes if the upload succeeded but the health check timed out.

## Database and recovery

The private Sites preview remains a separate deployment with its own D1 database. Preview feedback is not automatically copied into production, and the workflow does not change the preview URL.

Keep applied `drizzle/*.sql` migrations immutable; append new migrations. Use backward-compatible schema changes because migrations run before Worker upload. Migrations are tracked by Wrangler in the production database and applied once. A failure stops deployment; a failed migration does not roll back earlier migrations. Reverting application code does not reverse schema changes.

To recover an application regression, revert the problematic commit and merge/push the revert to `main`. That produces a new checked deployment. Avoid reverting schema migration files that have already run. For urgent provider-side rollback, use the Cloudflare Worker deployment history and then reconcile the rollback in Git.

## Local production-equivalent check

```sh
npm ci
npm run build
npm run prepare:deploy
npx wrangler deploy --config dist/server/wrangler.production.json --dry-run
npx wrangler d1 migrations apply DB --local --config dist/server/wrangler.production.json
npx wrangler dev --config dist/server/wrangler.production.json
```

`/api/health` is read-only and reports only readiness and the deployed Git revision. `/api/feedback` persists feedback; it does not expose submitted messages.
