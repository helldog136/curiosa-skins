# PROGRESS : avancement du skin retro-neon

## Fait
- Manifeste, jetons, feuille (skin.css), polices WOFF2 embarquées (OFL, voir LICENSES/), image décorative CC0, README, LICENSE, aperçus webp (accueil et blog, 1280 et 390).
- `skin:check --strict` valide (cœur 0.4.0). Installation RÉELLE par le service du cœur depuis un dépôt git local jetable : OK (catalogue, install). Vérifié dans Chromium (site de démonstration, 70 modules) : pas de défilement horizontal (12 pages × 4 largeurs), menu mobile au toucher et au clavier, focus visible, aucune requête externe, polices servies en 200/immutable/nosniff.
- `skin-proof` (20 pages × 4 largeurs, avec et sans le skin) : contenu identique, ordre de tabulation identique.

## Reste à faire
- Dernière passe de captures (12 pages × 4 largeurs) après les derniers correctifs, régénération des aperçus webp, vérification de l'installation depuis le dépôt final.
- `catalogue/index.json` (branche `catalogue-index`) avec `ref` = hash du dernier commit du skin.

## Commandes (cœur : clone de `feat/skins-int`, `package.json` passé à 0.4.0 localement, non commité ; `npm ci`, `npm run build`, `npm run visual:prepare`)
- Contrôle : `node scripts/skin-check.mjs <dossier-du-skin> --core-version 0.4.0 --strict`
- Captures : `VISUAL_SKIN_DIR=<dossier> VISUAL_SKIN_ID=retro-neon VISUAL_SKIN_FP=<empreinte> node scripts/visual/capture.mjs <sortie> --profiles skin-test` (l'empreinte : `validateSkinFolder(...).fingerprint`).
- Preuve de contenu : `scripts/visual/skin-proof.mjs` avec les mêmes variables.

## Pièges
- Le profil `skin-test` du harnais n'écrit pas l'empreinte (`fingerprint`) du skin dans `skin.installed` : sans elle, le cœur considère le skin « modifié » et applique basic. Il faut passer `VISUAL_SKIN_FP` (correctif local de `scripts/visual/profiles.mjs`).
- `minCore` 0.4.0 : le cœur de test doit annoncer 0.4.0.
- Les sélecteurs de liste de plus de 300 caractères sont refusés : utiliser `:is(...)`.
- Les éléments `div`, `article`, `section`, `span` ne sont pas ciblables : les cartes de modules gardent leurs coins arrondis.

## Défauts connus
- Le contenu HTML des modules (planning, événements, galerie, sondages…) garde ses propres rayons et bordures fines : aucun module ne déclare encore de pièces de skin.
- Sur les captures pleine page, la colonne latérale (retro-neon) s'arrête à la hauteur de la fenêtre (elle est collante dans un vrai navigateur).
