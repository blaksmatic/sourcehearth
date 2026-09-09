# Submit a game

1. Host a free playable build at an HTTPS URL.
2. Fork this repository.
3. Add `games/your-game-id.json`, using `games/universe-eater.json` as the working example.
4. Add a cover image under `public/images/` and set `image` to its path (for example `/images/your-game.webp`). Use an image you own or have permission to share. Do not embed credentials or private information.
5. Run `npm run validate:games` and open a pull request.

Required fields: `id`, `title`, `description`, `creator`, `tags`, `model`, `art`, `playUrl`, `repoUrl`, and `releases`. Use the actual AI tool/model name if known, otherwise `AI-assisted`. Use `art: "custom"` with your cover image. IDs must be lowercase letters, numbers, and hyphens, and match the filename. The game must be free to play and its source repository publicly accessible.

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
