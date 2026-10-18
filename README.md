# Blockchain portfolio

A one-page portfolio for five connected exchange projects: a trading screen, an account app, a double-entry ledger, an auth and security service, and a wallet service. Each project has a short summary, a drawing of what it does, how it is tested, a link to its code, and a live demo where one exists.

Live site: https://blockchain-portfolio-tobi.vercel.app (see the repository description for the current address)

## Edit it

Everything on the page comes from two files.

| File | What it holds |
|---|---|
| `data/profile.ts` | Name, handle, location, GitHub, and optional `email`, `linkedin`, and `x`. Fill one in and it appears in Contact. |
| `data/projects.ts` | One entry per project: summary, highlights, test count, tags, GitHub link, and an optional `live` link. |

To add a live demo, set `live` on the project. If a project has none, give it a `noLive` sentence instead. A test checks that every project has one or the other.

The test counts add up to the total shown in the hero, and `tests/data.test.ts` fails if they stop matching. Keep each number equal to the one in that repository's README.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test
npm run build
```

## Design

Noir to match the projects it shows: flat black surfaces, 1px borders, one amber accent for the main action. The drawings are diagrams made with the page's own colors, not screenshots. The reasoning is in `design-system/MASTER.md`.

## Notes

- The page is static. There is no server, no tracking, and no external requests apart from the links.
- The five projects run on test networks only.
