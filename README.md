# SourceHearth

**A community arcade for free, AI-assisted games that keep getting better.**

[Play games](https://sourcehearth.com) · [Submit a game](#submit-a-game) · [Update your game](#keep-your-game-growing) · [Contribution guide](CONTRIBUTING.md)

AI makes it easier to start a game. We want to help creators take it further: finish the core loop, fix the awkward controls, listen to players, and release the next version.

SourceHearth is a place to discover those games, explore their source, and follow their progress. Inspired by community arcades like 4399 and Roblox, we're starting with a simple discovery page built around people making games for the love of it. There's no monetization system today.

## Play something from the community

**[Universe Eater: Ascension](https://blaksmatic.github.io/universe-eater/)** by [blaksmatic](https://github.com/blaksmatic)

Survive the void, draft weapon upgrades, and face the Void Warden in a neon space survival arcade. Play on desktop or mobile, or [explore the source](https://github.com/blaksmatic/universe-eater).

**[Browse the arcade →](https://sourcehearth.com)**

## Submit a game

**Host your game, add its listing, and open a pull request.** Your game stays on your hosting; SourceHearth gives players a page to discover it and follow its updates.

Need somewhere to host it? Start with [GitHub Pages](https://docs.github.com/en/pages/quickstart), [Vercel](https://vercel.com/docs/getting-started-with-vercel), or [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/). Universe Eater uses GitHub Pages. Other hosts work too: put the public HTTPS link to your playable game in `playUrl`.

Have these ready:

- A free playable build at a public HTTPS URL.
- A public source repository.
- A cover image you own or have permission to share.
- A short description, the AI tool/model used, and accurate release notes.

### Your first pull request

1. **[Fork this repository](https://github.com/blaksmatic/sourcehearth/fork).** Create a branch for your submission, such as `add-my-game`.
2. **Add your listing** at `games/your-game-id.json`. Start with the [copyable example in the contribution guide](CONTRIBUTING.md#listing-example). Use your own title, creator name, play link, and source link.
3. **Add your cover** under `public/images/`. Set `art` to `"custom"` and `image` to its public path, such as `/images/your-game.webp`.
4. **[Open a pull request](https://github.com/blaksmatic/sourcehearth/compare)** from your fork's branch into this repository's `main`. Use a title like `Add: My Game` and fill in the checklist with your playable link and what players can expect.
5. **Follow the review.** GitHub checks the listing and site build automatically. Address any failed checks or reviewer feedback in the same branch. Once approved, merged, and successfully deployed, your game appears on SourceHearth.

You can add the listing and upload the cover using GitHub's web editor. Running SourceHearth locally isn't required to submit a game. If you work locally, check your listing with `npm run validate:games` before opening the PR.

**[Full submission guide and listing example →](CONTRIBUTING.md)**

## Keep your game growing

A first release is the beginning. Better controls, clearer tutorials, bug fixes, and thoughtful balance changes all give players a reason to return.

Publish the improved build on your own host, then open another PR updating your existing listing. Prepend a release with its **version or commit, UTC timestamp, and Added / Changed / Fixed notes**. Each game has its own changelog so players can see exactly what improved and when.

Keep old entries intact and use real release dates. Meaningful improvements matter more than update frequency. See the [release-note format](CONTRIBUTING.md#release-notes).

## Help the community

Play a game and leave useful feedback through its SourceHearth page. Feedback is currently private pending review. For a broken listing or a SourceHearth bug, [open an issue](https://github.com/blaksmatic/sourcehearth/issues). Listing corrections and improvements to the site are welcome as PRs, too.

Submissions and game updates happen through GitHub today. A friendlier submission tool may come later.

For contributors working on the website itself, see [Architecture & local development](ARCHITECTURE.md). Maintainers can find deployment and recovery instructions in [DEPLOYMENT.md](DEPLOYMENT.md).
