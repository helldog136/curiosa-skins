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
- the font stacks are the site's stacks. An overlay skin cannot ship fonts, so only the families the site ships itself are left out (and, where a token would exceed its limit of 7 names, the entries listed in `fontDrop`);
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
