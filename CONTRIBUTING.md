# Submit a game

1. Host a free playable build at an HTTPS URL.
2. Fork this repository.
3. Add `games/your-game-id.json`, using `games/universe-eater.json` as the working example.
4. Add a cover image under `public/images/` and set `image` to its path (for example `/images/your-game.webp`). Use an image you own or have permission to share. Do not embed credentials or private information.
5. Open a pull request from your fork's branch to `blaksmatic/sourcehearth:main`, using a title such as `Add: My Game`. Fill in the PR template and respond to any review feedback in the same branch.

You can create the JSON file and upload the cover in GitHub's web editor. GitHub runs validation automatically on your PR. If you work locally, run `npm run validate:games` before submitting; no running server or deployment credentials are needed for that check.

Required fields: `id`, `title`, `description`, `creator`, `tags`, `model`, `art`, `playUrl`, `repoUrl`, and `releases`. Use the actual AI tool/model name if known, otherwise `AI-assisted`. Use `art: "custom"` with your cover image. IDs must be lowercase letters, numbers, and hyphens, and match the filename. The game must be free to play and its source repository publicly accessible.

## Listing example

Save this as `games/your-game-id.json` and replace the example values with your own. Add your cover at `public/images/your-game.webp`. Use the actual date and version of your release; the timestamp below is illustrative.

```json
{
  "id": "your-game-id",
  "title": "Your Game",
  "description": "A short description of what players do in your game.",
  "creator": "your-github-username",
  "tags": ["Arcade"],
  "model": "AI-assisted",
  "art": "custom",
  "image": "/images/your-game.webp",
  "playUrl": "https://your-username.github.io/your-game/",
  "repoUrl": "https://github.com/your-username/your-game",
  "releases": [
    {
      "version": "0.1.0",
      "timestamp": "2026-09-09T16:00:00Z",
      "title": "First playable release",
      "changes": [
        {"type": "Added", "text": "Describe what players can try in this release."}
      ]
    }
  ]
}
```

For a real listing with commit-based history, see [Universe Eater](games/universe-eater.json).

## Release notes

Each release includes `version`, an ISO 8601 UTC `timestamp`, `title`, and `changes`. Each change has a `type` (`Added`, `Changed`, or `Fixed`) and `text`. An optional `sourceUrl` links to the corresponding GitHub commit; for commit-based history, put the abbreviated commit ID in `version` instead of inventing a release number. Use real dates and describe player-visible changes accurately. Keep the newest release first.

For example:

```json
{
  "version": "0.2.0",
  "timestamp": "2026-09-09T16:00:00Z",
  "title": "Clearer controls",
  "changes": [
    {"type": "Fixed", "text": "Prevented touch controls sticking after pause."}
  ]
}
```

For an update, edit your existing game file, prepend the new release, and open another PR. Do not rewrite old release timestamps just to appear recently updated. Substantial improvements matter more than update frequency.

Maintainers review the playable URL, source availability, image permission, and listing accuracy before accepting. A friendlier submission tool may come later; for now, submissions and updates happen entirely through GitHub.
