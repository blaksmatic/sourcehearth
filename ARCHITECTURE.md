# Architecture

SourceHearth is a discovery catalogue. Creators host game builds independently; this repository holds their listings, covers, and per-game release histories.

## Catalogue and website

- `games/*.json` is the source of truth for game metadata and changelogs. `scripts/validate-games.mjs` checks IDs, URLs, image paths, and release structure.
- `lib/games.ts` imports the listings at build time and sorts them by their newest release timestamp. Listing changes reach the website through a deployment.
- `app/page.tsx` provides discovery, game details, submission guidance, and feedback forms. The featured game is currently curated there.
- `public/images/` holds cover assets. Game binaries and game servers live on the creators' own hosts.

The website uses React, TypeScript, Vinext, Vite, and Tailwind CSS. Cloudflare Workers serves the application and static assets at `sourcehearth.com` and `www.sourcehearth.com`.

## Player feedback

`POST /api/feedback` validates same-origin JSON submissions and stores text in Cloudflare D1 through the `DB` binding. It limits payload size and submission frequency, using parameterized SQL and a daily visitor digest for abuse control. Raw visitor IP addresses are not stored in the feedback table.

Feedback is private with a `pending` status; there is no public comment feed. D1 stores feedback, while Git holds game metadata. The schema is defined in `db/schema.ts`, with migrations under `drizzle/`.

`GET /api/health` checks database readiness and reports the deployed Git revision without exposing feedback.

## Delivery

GitHub Actions validates pull requests. Pushes to `main` additionally apply pending production migrations, deploy the tested build, and verify the live site and revision. Production configuration lives in `deploy/cloudflare.json`.

A separate private Sites preview has its own database and hosting configuration in `.openai/hosting.json`. Preview feedback is not copied into production.

See [DEPLOYMENT.md](DEPLOYMENT.md) for credentials, the complete pipeline, migration handling, and rollback procedures.

## Local development

Requires Node.js 22.13+.

```sh
npm ci
npm run dev
```

Before submitting application changes:

```sh
npm run validate:games
npx tsc --noEmit
npm run build
```

For a local Worker with a migrated feedback database, follow the [production-equivalent check](DEPLOYMENT.md#local-production-equivalent-check). Game-listing contributors can follow [CONTRIBUTING.md](CONTRIBUTING.md) without running the server.
