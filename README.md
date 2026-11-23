# curiosa-skins

Catalogue officiel des skins de [Curiosa](https://github.com/helldog136/Curiosa) (cœur 0.4.0 ou plus ; skins d'overlay : cœur 0.9.0 ou plus).
*Official catalogue of [Curiosa](https://github.com/helldog136/Curiosa) skins (core 0.4.0 or later).*

## Les skins / The skins

| Skin | Version | Modes | Dossier / Folder |
|---|---|---|---|
| Brutaliste clair / Light brutalist | 1.1.3 | clair / light | `skins/brutaliste-clair` |
| Curiosa / Curiosa | 1.0.2 | clair, sombre / light, dark | `skins/curiosa` |
| Éditorial papier / Editorial paper | 1.1.3 | clair, sombre / light, dark | `skins/editorial-papier` |
| Globe-trotter / Globe-trotter | 1.1.0 | clair, sombre / light, dark | `skins/globe-trotter` |
| Féodal / Feudal | 1.1.3 | clair, sombre / light, dark | `skins/feodal` |
| Financier | 1.0.0 | clair, sombre / light, dark | `skins/financier` |
| Pirates / Pirates | 1.1.3 | clair, sombre / light, dark | `skins/pirates` |
| Nef de braise / Ember nave | 1.1.3 | sombre, clair / dark, light | `skins/nef-de-braise` |
| Rétro néon / Retro neon | 1.1.3 | sombre / dark | `skins/retro-neon` |
| Steampunk victorien / Victorian steampunk | 1.1.3 | sombre, clair / dark, light | `skins/steampunk-victorien` |
| Tissu / Fabric | 1.1.2 | clair, sombre / light, dark | `skins/tissu` |
| Verre et dégradés doux / Soft glass | 1.1.3 | clair, sombre / light, dark | `skins/verre-doux` |

Les versions 1.1.x habillent la recherche dans le site (pièces `search` et `mark`, champ et mot mis en valeur) et demandent le cœur 0.6.3 ou plus. La 1.1.1 corrige la mise en page des en-têtes à petite largeur (en-têtes sobre, à deux rangées et classique) et les cibles tactiles de 44 px.
*Version 1.1.x of each skin styles the site search (`search` and `mark` parts: the field and the highlighted word) and needs core 0.6.3 or later. Version 1.1.1 fixes the header layouts on narrow screens (minimal, two-row and classic headers) and the 44 px touch targets.*

La 1.1.2 (1.0.1 pour Curiosa) habille l'affichage en liste du cœur 0.6.18 (lignes `card` `data-kind="row"` et champ `search` `data-variant="list"`) ; les anciennes règles `list-item` du mode liste sont retirées.
*Version 1.1.2 (1.0.1 for Curiosa) styles the core 0.6.18 list display (`card` `data-kind="row"` rows and the `search` `data-variant="list"` field); the old `list-item` rules of the list mode are removed.*

La 1.1.3 (1.0.2 pour Curiosa) corrige le débordement horizontal d'Éditorial papier à 390 px (cartes de pastille de couleur et de phrase à copier) et ajoute un README bilingue à chaque skin de site.
*Version 1.1.3 (1.0.2 for Curiosa) fixes Editorial paper's horizontal overflow at 390 px (colour swatch and copy-phrase cards) and gives every site skin a bilingual README.*

Financier 1.0.0 est une fintech éditoriale (bourse, bitcoin et altcoins : page blanche sur fond de couleur, titres serif, surligneur, tuiles, bougies) ; il demande le cœur 0.44.0 ou plus et déclare une personnalisation (trois ambiances : Bourse, Bitcoin, Altcoin ; couleur d'accent et surligneur en accès direct). Il ne donne aucun conseil financier : seul l'aspect change.
*Financier 1.0.0 is an editorial fintech look (stocks, bitcoin and altcoins: white page on a coloured backdrop, serif headings, highlighter, tiles, candlesticks); it needs core 0.44.0 or later and declares a customization (three looks: Bourse, Bitcoin, Altcoin; accent colour and highlighter within direct reach). It gives no financial advice: only the look changes.*

Globe-trotter 1.1.0 déclare une personnalisation (cœur 0.44.0 ou plus : trois ambiances, couleur d'accent et couleurs du carnet) ; sans rien toucher, son rendu est celui de la 1.0.0.
*Globe-trotter 1.1.0 declares a customization (core 0.44.0 or later: three looks, accent colour and notebook colours); untouched, it renders as 1.0.0 did.*

Chaque skin est un dossier de données (`skin.json`, `tokens.json`, `skin.css`, polices et images avec leurs licences) : aucun programme ne s'exécute, seule l'apparence change.
*Each skin is a folder of data: no code runs, only the appearance changes.*

## Skins d'overlay / Overlay skins

Les skins d'overlay habillent les **pages d'overlay pour OBS** (jamais le site public) : couleurs, polices du système, bordures, ombres, petite animation. Ils demandent le cœur **0.9.0** ou plus, se choisissent dans l'onglet **Skin** d'une page d'overlay, et peuvent changer tout seuls selon le jeu en cours (ou toute autre situation fournie par une extension). Depuis la 1.1.0, chaque skin a sa propre composition (formes découpées, cadres, décorations, mouvements discrets) et un aperçu animé. Ils sont listés dans `catalogue/overlay-skins.json` (fichier à part : un cœur plus ancien ne les voit pas). Aucun programme, aucune police, aucune image : `skin.json` avec `"kind": "overlay"`, `tokens.json` (jetons `--ov-*`) et `skin.css` (règles `[data-ov-part]`).
*Overlay skins restyle the **OBS overlay pages** (never the public site): colours, system fonts, borders, shadows, a small animation. They need core **0.9.0** or later, are picked in the **Skin** tab of an overlay page, and can change by themselves with the current game (or any other situation an extension provides). Since 1.1.0, each skin has its own composition (cut shapes, frames, decorations, quiet motion) and an animated preview. They are listed in `catalogue/overlay-skins.json` (a separate file: an older core does not see them). No program, no font, no image: `skin.json` with `"kind": "overlay"`, `tokens.json` (`--ov-*` tokens) and `skin.css` (`[data-ov-part]` rules).*

| Skin | Version | Dossier / Folder |
|---|---|---|
| Trône de braise / Ember throne | 1.1.1 | `skins/ember-throne` |
| Bannière héroïque / Heroic banner | 1.1.1 | `skins/heroic-banner` |
| Signal profond / Deep signal | 1.1.1 | `skins/deep-signal` |
| Veille nocturne / Night watch | 1.1.1 | `skins/night-watch` |
| Néon nocturne / Night neon | 1.2.1 | `skins/night-neon` |
| Salle d'arcade / Arcade hall | 1.1.2 | `skins/arcade-hall` |
| Pouls d'arène / Arena pulse | 1.1.0 | `skins/arena-pulse` |
| Collage de papier / Paper collage | 1.1.0 | `skins/paper-collage` |
| Plateau télé / Studio desk | 1.1.0 | `skins/studio-desk` |
| Bobine / Film reel | 1.1.0 | `skins/film-reel` |
| Verre léger / Soft glass | 1.1.0 | `skins/soft-glass` |
| Affiche audacieuse / Bold poster | 1.1.2 | `skins/bold-poster` |
| Formes nettes / Sharp shapes | 1.1.1 | `skins/sharp-shapes` |
| Élan / Momentum | 1.1.1 | `skins/momentum` |
| Éditorial papier (overlay) / Editorial paper overlay | 1.0.0 | `skins/editorial-papier-overlay` |
| Brutaliste clair (overlay) / Light brutalist overlay | 1.0.0 | `skins/brutaliste-clair-overlay` |
| Curiosa (overlay) / Curiosa overlay | 1.0.0 | `skins/curiosa-overlay` |
| Financier (overlay) / Trading desk overlay | 1.0.0 | `skins/financier-overlay` |
| Féodal (overlay) / Feudal overlay | 1.0.0 | `skins/feodal-overlay` |
| Pirates (overlay) / Pirates overlay | 1.0.0 | `skins/pirates-overlay` |
| Steampunk victorien (overlay) / Victorian steampunk overlay | 1.0.0 | `skins/steampunk-victorien-overlay` |
| Nef de braise (overlay) / Ember nave overlay | 1.0.0 | `skins/nef-de-braise-overlay` |
| Verre et dégradés doux (overlay) / Soft glass and gradients overlay | 1.0.0 | `skins/verre-doux-overlay` |
| Tissu (overlay) / Fabric overlay | 1.0.0 | `skins/tissu-overlay` |
| Globe-trotter (overlay) / Globe-trotter overlay | 1.0.0 | `skins/globe-trotter-overlay` |

**Jauges, niveaux et compteurs animés (cœur 0.30.0, contrat 4).** Un skin d'overlay peut ajouter `animation.json` : une recette de données (primitives procédurales, paramètres, graines) que le cœur dessine lui-même. *Néon nocturne* 1.2.0 (tubes et pistes de circuit) en a une. Les autres skins donnent une jauge simple qui suit leurs couleurs. Contrat : `docs/OVERLAY-ANIMATIONS.md` du cœur.
*Animated gauges, levels and counters (core 0.30.0, contract 4). An overlay skin may add `animation.json`: a data recipe (procedural primitives, parameters, seeds) that the core draws itself. Night neon 1.2.0 (tubes and circuit traces) has one. Other skins give a plain gauge that follows their colours. Contract: the core's `docs/OVERLAY-ANIMATIONS.md`.*

Corrections mécaniques (sans changement de style) : Salle d'arcade 1.1.2 et Affiche audacieuse 1.1.2 réservent la place du tampon des cartes ; Trône de braise, Bannière héroïque et Élan 1.1.1 ne coupent plus le texte des pastilles ; Formes nettes 1.1.1 rend la piste de barre visible sur le panneau blanc ; Néon nocturne 1.2.1 garde l'anneau de choc dans l'élément.
*Mechanical fixes (no change of style): Arcade hall 1.1.2 and Bold poster 1.1.2 reserve room for the card stamp; Ember throne, Heroic banner and Momentum 1.1.1 no longer cut the badge text; Sharp shapes 1.1.1 makes the bar track visible on the white panel; Night neon 1.2.1 keeps the shock ring inside the element.*

Écrire un skin d'overlay : `docs/OVERLAY-SKINS.md` du cœur ; le vérifier : `npm run skin:check -- <dossier>`.
*Writing an overlay skin: the core's `docs/OVERLAY-SKINS.md`; checking it: `npm run skin:check -- <folder>`.*

## Jumeaux d'overlay / Overlay twins

Chaque skin de site du catalogue a un **jumeau d'overlay** (un test le garantit : un nouveau skin de site arrive avec son jumeau) : un skin d'overlay de même identité (couleurs, ambiance, formes de base, pile de polices du site sans les polices que le site embarque), pour que vos overlays OBS ressemblent à votre site. Le lien est écrit dans la description du jumeau (« Jumeau d'overlay du skin de site … »), dans son README et dans ce tableau ; `catalogue/twins.json` le dit aux outils et `tests/overlay-twins.test.mjs` vérifie qu'un jumeau ne s'écarte pas de son skin de site. L'audit et les choix sont dans `docs/OVERLAY-TWINS.md`.
*Every site skin of the catalogue has an **overlay twin**: an overlay skin of the same identity (colours, mood, basic shapes, the site's font stack without the fonts the site ships), so your OBS overlays look like your site. The pairing is written in the twin's description ("Overlay twin of the … site skin"), in its README and in this table; `catalogue/twins.json` tells the tools and `tests/overlay-twins.test.mjs` checks that a twin does not drift from its site skin. The audit and the decisions are in `docs/OVERLAY-TWINS.md`.*

| Skin de site / Site skin | Jumeau d'overlay / Overlay twin | Origine / Origin |
|---|---|---|
| Rétro néon / Retro neon (`skins/retro-neon`) | Néon nocturne / Night neon (`skins/night-neon`) | existant / existing |
| Éditorial papier / Editorial paper (`skins/editorial-papier`) | Éditorial papier (overlay) / Editorial paper overlay (`skins/editorial-papier-overlay`) | nouveau / new |
| Brutaliste clair / Light brutalist (`skins/brutaliste-clair`) | Brutaliste clair (overlay) / Light brutalist overlay (`skins/brutaliste-clair-overlay`) | nouveau / new |
| Curiosa / Curiosa (`skins/curiosa`) | Curiosa (overlay) / Curiosa overlay (`skins/curiosa-overlay`) | nouveau / new |
| Financier / Trading desk (`skins/financier`) | Financier (overlay) / Trading desk overlay (`skins/financier-overlay`) | nouveau / new |
| Féodal / Feudal (`skins/feodal`) | Féodal (overlay) / Feudal overlay (`skins/feodal-overlay`) | nouveau / new |
| Pirates / Pirates (`skins/pirates`) | Pirates (overlay) / Pirates overlay (`skins/pirates-overlay`) | nouveau / new |
| Steampunk victorien / Victorian steampunk (`skins/steampunk-victorien`) | Steampunk victorien (overlay) / Victorian steampunk overlay (`skins/steampunk-victorien-overlay`) | nouveau / new |
| Nef de braise / Ember nave (`skins/nef-de-braise`) | Nef de braise (overlay) / Ember nave overlay (`skins/nef-de-braise-overlay`) | nouveau / new |
| Verre et dégradés doux / Soft glass (`skins/verre-doux`) | Verre et dégradés doux (overlay) / Soft glass and gradients overlay (`skins/verre-doux-overlay`) | nouveau / new |
| Tissu / Fabric (`skins/tissu`) | Tissu (overlay) / Fabric overlay (`skins/tissu-overlay`) | nouveau / new |
| Globe-trotter / Globe-trotter (`skins/globe-trotter`) | Globe-trotter (overlay) / Globe-trotter overlay (`skins/globe-trotter-overlay`) | nouveau / new |

## Installer un skin / Installing a skin

Dans l'administration de votre site, **Apparence** : les skins de ce catalogue s'installent en un clic. Pour une version précise, **Ajouter depuis une adresse** :
*In your site's admin, **Appearance**: skins from this catalogue install in one click. For an exact version, use **Add from an address**:*

```
https://github.com/helldog136/curiosa-skins#<id>/v<version>:skins/<id>
```

Exemple / Example : `https://github.com/helldog136/curiosa-skins#retro-neon/v1.0.0:skins/retro-neon`

## Comment le catalogue fonctionne / How the catalogue works

- Le cœur lit `catalogue/index.json` sur la branche par défaut (`main`) de ce dépôt.
  *The core reads `catalogue/index.json` on this repository's default branch (`main`).*
- Chaque entrée épingle son skin par une **étiquette** `<id>/v<version>` (champ `ref`), jamais par un hash ni une branche. Une étiquette n'est jamais déplacée : une nouvelle version, c'est une nouvelle étiquette et une nouvelle ligne.
  *Each entry pins its skin with a **tag** `<id>/v<version>` (`ref`), never a hash or a branch. A tag is never moved: a new version means a new tag and a new entry.*
- Le workflow `.github/workflows/tag-skins.yml` crée les étiquettes manquantes à chaque modification de `catalogue/index.json` sur `main` (ou à la demande).
  *The `tag-skins.yml` workflow creates missing tags whenever `catalogue/index.json` changes on `main` (or on demand).*

## Proposer un skin / Proposing a skin

1. Écrivez votre skin à partir du gabarit `docs/skin-starter/` du cœur et du guide `docs/CREER-UN-SKIN.md`. / *Start from the core's `docs/skin-starter/` and the `docs/CREER-UN-SKIN.md` guide.*
2. Vérifiez-le : `npm run skin:check -- <dossier> --visual --strict` doit passer sans avertissement. / *Check it: `npm run skin:check -- <folder> --visual --strict` must pass with no warning.*
3. Ouvrez une issue ou une demande de fusion ici avec l'adresse de votre dépôt, l'étiquette à relire et le résultat du contrôle. / *Open an issue or pull request here with your repository address, the tag to review and the check result.*
4. Après relecture, une entrée est ajoutée à `catalogue/index.json`. L'inscription est facultative : tout skin s'installe aussi depuis sa propre adresse. / *After review, an entry is added to `catalogue/index.json`. Listing is optional: any skin can also be installed from its own address.*

Écriture neutre en genre exigée dans les textes (noms, descriptions, README) et aucun nom de site réel dans le skin. / *Gender-neutral wording is required in all texts, and no real site name may appear in a skin.*

## Licence / License

Chaque skin porte sa licence (MIT, sauf Globe-trotter et Financier : CC0-1.0) et celles de ses polices et images dans son dossier. / *Each skin carries its own license (MIT, except Globe-trotter and Financier: CC0-1.0) and those of its fonts and images in its folder.*
