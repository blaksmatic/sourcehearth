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

Hosting uses Cloudflare Workers through Sites. The current site preview is private; this repository and the games linked here are public. GitHub Pages hosts Universe Eater, but cannot run SourceHearth's D1 feedback endpoint. For a separate deployment, use your own Sites project identity and database; do not reuse the original project's ID in `.openai/hosting.json`.

Pull-request checks validate listing structure and compile the site. Merging a pull request does not yet automatically publish the hosted site; deployment is maintained separately.
