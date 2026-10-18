# Design system: blockchain portfolio

**Product.** A one-page portfolio for five connected exchange projects. A visitor should see the work first, understand how the pieces fit, and find the code or the live demo in one click.

**Pattern.** Portfolio: work first, then how it fits, how it is checked, a short about, contact. Case studies, not feature lists.

**Style.** Noir, matching the projects it shows. Flat black surfaces, 1px borders, no shadows, no gradients.

**Color.** Neutrals plus one amber accent for the main action. Green and red appear only inside the order book sketch, next to the words Bids and Asks. No blue or purple.

**Type.** Geist for text, JetBrains Mono for numbers and repository names. Scale 12, 14, 16, 20, 24, 32, 48, 64.

**Layout.** Left aligned. Sections change shape: split hero, a list of case studies, a diagram, a table, prose. Line length stays under 75 characters.

**Motion.** None beyond color changes on hover and press.

**Facts.** Every number on the page comes from `data/projects.ts` and matches a repository's own README. Nothing is rounded up.

**Avoid.** Everything under Hard Bans in the Hermes design skill. No "built with" logo walls, no skill percentages, no screenshots that are not real.
