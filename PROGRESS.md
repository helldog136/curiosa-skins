# PROGRESS : skin brutaliste-clair (1.0.0)

## Fait
- Skin complet : skin.json, tokens.json, skin.css, polices WOFF2 embarquées (OFL, voir LICENSES/), image SVG décorative (CC0), README, LICENSE, previews/ (accueil et blog, 1280×800 et 390×844).
- `npm run skin:check -- skins/brutaliste-clair --visual --strict --core-version 0.4.0` (cœur `feat/skins-int2`) : valide, aucun avertissement, seulement des conseils sans conséquence.
- Boîtes intérieures des modules restylées par les sélecteurs `[data-skin-part="module-html"] …` (article, section, div, span : angles droits et cadres).
- `--sk-gradient: flat` (brutaliste), cibles d'au moins 44 px, tailles de texte ≥ 12 px (14 px pour le texte courant), couleurs de base au niveau AAA conseillé (≥ 7:1 pour les paires de boutons et d'états).
- Vérifié : installation réelle par le service du cœur, skin-proof (contenu identique avec/sans le skin), captures 12 pages × 4 largeurs.

## Reste à faire
- Rien d'obligatoire. Publier : étiqueter `brutaliste-clair/v1.0.0` après relecture, puis mettre l'étiquette dans `ref` du catalogue (§25.5 de docs/SKINS.md).

## Commandes (cœur : clone de `feat/skins-int2`, `npm ci`, `npx prisma generate`, `npm run build`, `npm run visual:prepare`)
- Contrôle complet : `npm run skin:check -- <dossier du skin> --visual --strict --core-version 0.4.0`
- Captures et preuve de contenu : `VISUAL_SKIN_DIR=<dossier> VISUAL_SKIN_ID=brutaliste-clair VISUAL_SKIN_IGNORE_MINCORE=1 node scripts/visual/capture.mjs <sortie> --profiles skin-test` puis `node scripts/visual/skin-proof.mjs`.

## Pièges
- Dans un `:is()` les sélecteurs se multiplient : une règle ne doit pas dépasser 20 sélecteurs (la découper).
- `aside`, `form`, `a[href]` ne sont pas ciblables, même sous `module-html`.
- Sous `module-html`, ne pas poser `border-width` sur `div` ou `span` : le cœur et les modules mettent `border-style: solid` partout, ce qui ferait apparaître des bordures de 2 px sur tous les éléments.
- Un lien seul sur sa ligne a besoin de `min-height: var(--sk-target)` (liens de cartes, « Retour à l'accueil »).

## Défauts connus
- La boîte `form` d'un module (par exemple le formulaire de commandes) garde ses coins arrondis (`form` n'est pas ciblable).
- Les rangées internes des modules (`div` à bordure de 1 px) gardent leur épaisseur d'origine.
