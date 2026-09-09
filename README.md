# SourceHearth

A community catalogue for free, AI-assisted games that keep getting better.

Play a game, explore its source, and follow the creator's updates. Creators host their own games. Listings and per-game changelogs are maintained through GitHub pull requests; player feedback is stored separately in Cloudflare D1.

## Play the first game

**[Universe Eater: Ascension](https://blaksmatic.github.io/universe-eater/)** by [blaksmatic](https://github.com/blaksmatic). [Game source](https://github.com/blaksmatic/universe-eater).

## Submit or update a game

Read [CONTRIBUTING.md](CONTRIBUTING.md). Add one JSON listing to `games/`, or update your existing listing with dated release notes, then open a pull request. No uploads or accounts on SourceHearth are required.

## Development

Requires Node.js 22.13+.

```sh
npm ci
npm run dev
npm run validate:games
npm run build
```

Listings are bundled automatically from `games/*.json`. The featured game is currently curated in `app/page.tsx`. D1 stores feedback, not game metadata or game files. Feedback is private pending review; there is no public comment feed or monetization system.

Production hosting uses Cloudflare Workers and D1 in the SourceHearth account. GitHub Pages hosts Universe Eater; it cannot run SourceHearth's feedback endpoint. A separate private Sites preview is retained for design work.

Pull requests validate listings, typecheck, build, and test migrations locally. Once the deployment token is configured, pushes to `main` automatically migrate D1, publish to `sourcehearth.com`, and verify the live revision. See [DEPLOYMENT.md](DEPLOYMENT.md) for credential setup, operations, and recovery.
