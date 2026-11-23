# Overlay twins

Every public **site** skin of this catalogue has an **overlay twin**: an overlay skin of the same visual identity (palette, type, mood, basic shapes), so a streamer's OBS overlays look like their site. A person who wears *Feudal* on the site can wear *Feudal overlay* on the overlay pages and nobody will say they come from two brands.

*Chaque skin de site public du catalogue a un **jumeau d'overlay** : un skin d'overlay de même identité visuelle, pour que les overlays OBS ressemblent au site.*

## How the pairing is declared

The skin manifest has no field for it and the core does not read one (`src/core/skins/manifest.ts` ignores unknown keys, the catalogue reader keeps a fixed list of fields), so the pairing is written where people and tools can find it, without touching the core:

- the twin's **description**, in both languages, starts with "Overlay twin of the *Name* site skin" / "Jumeau d'overlay du skin de site *Nom*" (the catalogue card shows it);
- the twin's **name** is the site skin's name followed by "overlay" / "(overlay)";
- the twin's **README** names the site skin and its id;
- the repository **README** lists every pair in a table;
- `catalogue/twins.json` pairs the ids for tools. The core never reads it (like any file outside `catalogue/index.json` and `catalogue/overlay-skins.json`); `tests/overlay-twins.test.mjs` does.

## How a twin cannot drift

The twin is built from the site skin's own files, and the test fails if they part:

- the key colours declared in `catalogue/twins.json` (`match`: text, panel, border, accent, muted…) are equal to the site skin's, in the mode the twin follows (`siteMode`, the site's default look);
- every colour the twin writes (tokens and sheet) is a colour that the site skin also uses (black and white aside);
- the font stacks are the site's stacks. Since core 0.47.0 (skin contract 6) an overlay skin embeds fonts: a twin of a site skin that ships fonts ships **the very same files** (same bytes, same family name, weight, style and OFL text; the test compares hashes) and writes the site's declared families first. A contract 6 stack may only name declared families, a short list of known system fonts and a generic family last, so the entries it cannot carry ("Iowan Old Style", "Trajan Pro", a font name that is neither declared nor known…) are listed in `fontDrop` in `catalogue/twins.json`. A site skin that ships no font (Trading desk, Ember nave, Globe-trotter: named system fonts only) has a twin with no font and the same stack;
- `twinOf` in the twin's `skin.json` and in its catalogue entry is the site skin id, and equals `catalogue/twins.json`;
- the description, name, tags and README say whose twin it is.

An overlay skin has a single look (no `modes`), so a twin follows the site's **default** mode: light for most, dark for the skins whose identity is dark (Retro neon, Victorian steampunk, Ember nave).

## Audit and decisions

A skin is **adopted** only if a person would say it comes from the same brand: same palette family *and* same mood. Existing overlay skins are never recoloured to fit (an installed skin must not change look in a way people did not choose): when it is close but not the same, a **new** twin is added.

| Site skin | Twin | Decision | Why |
|---|---|---|---|
| Retro neon (`retro-neon`) | Night neon (`night-neon`) | adopted | Same two neon colours (magenta `#ff5af2`, cyan `#26e8ff`), same text colour (`#f5f0ff`), same near-black violet ground and glow. Only the pixel heading font of the site cannot be shipped by an overlay skin. |
| Editorial paper (`editorial-papier`) | Editorial paper overlay (`editorial-papier-overlay`) | new | Closest: Paper collage (kraft paper, rust, offset shadow, handwritten headings): same colour family, opposite mood (playful collage against a magazine page). Film reel is editorial but cinema black. |
| Light brutalist (`brutaliste-clair`) | Light brutalist overlay (`brutaliste-clair-overlay`) | new | Closest: Bold poster (flat yellow, thick frame, hard shadow, red). Same attitude, but the site is white blocks on cream with electric blue, orange and mono type. Recolouring Bold poster would change installed looks. Sharp shapes is white and gentle. |
| Curiosa (`curiosa`) | Curiosa overlay (`curiosa-overlay`) | new | No overlay skin has the cream and ink, brass, terracotta and sage identity with drawer-style cards. |
| Trading desk (`financier`) | Trading desk overlay (`financier-overlay`) | new | Closest: Sharp shapes (white cards, blue bar). Nothing with fine serif headings, lime highlighter and deep black. |
| Feudal (`feodal`) | Feudal overlay (`feodal-overlay`) | new | Closest: Heroic banner (midnight blue, gold, banner red): the heraldic colours match, but its panels are dark with massive sans capitals, where the site is illuminated parchment with engraved serif capitals. Ember throne is dark with a gold double rule. |
| Pirates (`pirates`) | Pirates overlay (`pirates-overlay`) | new | Nothing with treasure-map parchment, oxblood red, brass and turquoise sea with poster lettering. |
| Victorian steampunk (`steampunk-victorien`) | Victorian steampunk overlay (`steampunk-victorien-overlay`) | new | Closest: Ember throne (dark brown, gold, serif): same family of tones, but it reads as epic fantasy (gold double rule, brackets). The site is a workshop: leather, brass and copper, plates with cut corners. Borderline, kept separate so neither installed skin changes. |
| Ember nave (`nef-de-braise`) | Ember nave overlay (`nef-de-braise-overlay`) | new | Closest: Ember throne (dark parchment, gold accent). The site is obsidian with an ember red accent (`#ff5d4d`) and tarnished gold lines, spaced capitals; the accent colour differs, so not the same brand. |
| Soft glass (`verre-doux`) | Soft glass and gradients overlay (`verre-doux-overlay`) | new | Closest: Soft glass (`soft-glass`, smoked navy glass, blue accent `#8ab4ff`). Same shape language, different palette: the site is pale frosted glass with a violet (`#5b4bdb`) to pink (`#c2307a`) gradient. Note the existing name clash: the site skin and `soft-glass` are both "Soft glass" in English; the twin is named "Soft glass and gradients overlay" (after the French site name) to avoid a third. |
| Fabric (`tissu`) | Fabric overlay (`tissu-overlay`) | new | Nothing with linen and felt, dashed cross-stitch, terracotta and blue, soft round lettering. |
| Globe-trotter (`globe-trotter`) | Globe-trotter overlay (`globe-trotter-overlay`) | new | Closest: Paper collage (kraft, rust, handwritten headings, offset shadow): another mood and palette. Nothing in forest green and ochre with contour lines. |

Result: 1 of 12 site skins is served by an existing overlay skin (adopted), 11 get a new twin. Once all twins exist `planned` in `catalogue/twins.json` is empty and the test fails for any new site skin without a twin.

## Limits

- Overlay skins have no `modes` and (outside a `scene`) no images: twins follow the site's default mode and carry the site's decoration only where a closed overlay preset can express it (rules, brackets, dashes, rings, notches). Fonts need core 0.47.0: a twin with fonts has `skinContract` 6 and `minCore` 0.47.0 and cannot be installed on an older site.
- Fonts are 150 KB each, 4 at most, 400 KB per skin. Twins ship the heading and body families (roman, plus italic when the site has it), not the site's drop-cap or ornamental faces, except Curiosa, whose label font is used by the twin's badges and tags.
- The twins were judged on the core's sample scene (alert, counter, list, featured card, banner), side by side with the site's preview, not in OBS or on a live site.
- `twinOf` (core 0.47.0) lets the overlay gallery show "Matches your site skin" and offer the twin when the site skin changes. Night neon (adopted, 1.2.1) does not declare it yet: it is an existing skin and was left untouched.
