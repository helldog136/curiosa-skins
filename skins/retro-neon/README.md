# Rétro néon

Un skin **sombre** d'arcade : noir profond, néons **magenta** et **cyan**, polices pixel, grille et lignes de balayage en fond, **menu en colonne à gauche**.

## Ce que vous voyez

- **Colonne latérale** à gauche dès 640 px de large : la marque en haut, le menu en liste verticale, les réseaux et la langue en bas. Sur téléphone, c'est une bande en haut avec le bouton « Menu ».
- **Titres lumineux** en police pixel (Press Start 2P), textes très lisibles en JetBrains Mono.
- **Cartes et panneaux à cadre néon**, boutons qui s'allument au survol.
- Un seul mode : **sombre**. Aucune bascule clair/sombre n'est proposée.
- Si votre appareil n'a pas demandé de réduire les mouvements, le grand titre palpite doucement et la grille glisse lentement. Sinon, tout reste immobile.

## Ce que ce skin ne fait pas

Il ne change **que l'apparence**. Aucun texte, aucun lien, aucune image de votre site n'est ajouté, retiré ou déplacé dans le code : si vous changez de skin, vous ne perdez rien. Le texte courant garde de forts contrastes malgré les néons (le néon sert aux cadres et aux titres).

## Accessibilité

- Contrastes AA contrôlés pour tous les textes.
- Cibles tactiles d'au moins 44 px, indicateur de focus jaune épais.
- Mouvement réduit respecté : les animations n'existent que dans une règle `prefers-reduced-motion: no-preference`.

## Contenu du dossier

- `skin.json`, `tokens.json`, `skin.css` : le skin lui-même.
- `fonts/` : Press Start 2P et JetBrains Mono (licence SIL OFL 1.1, voir `LICENSES/`).
- `images/grille.svg` : la grille de fond (CC0).
- `previews/` : captures réelles (accueil et blog, 1280 px et 390 px).

Licence du skin : MIT (voir `LICENSE`).

---

# Retro neon (English)

A **dark** arcade skin: deep black, **magenta** and **cyan** neon, pixel fonts, a grid and scan lines in the background, a **menu in a column on the left**.

## What you see

- **Side column** on the left from 640 px wide: the brand at the top, the menu as a vertical list, social links and language at the bottom. On a phone, it is a strip at the top with the "Menu" button.
- **Glowing titles** in a pixel font (Press Start 2P), very readable text in JetBrains Mono.
- **Cards and panels with a neon frame**, buttons that light up on hover.
- A single mode: **dark**. No light/dark switch is offered.
- If your device has not asked for reduced motion, the main title pulses gently and the grid slides slowly. Otherwise everything stays still.

## What this skin does not do

It changes **the look only**. No text, link or image of your site is added, removed or moved in the code: if you switch skins, you lose nothing. Body text keeps strong contrast despite the neon (neon is used for frames and titles).

## Accessibility

- AA contrast checked for all texts.
- Touch targets of at least 44 px, a thick yellow focus indicator.
- Reduced motion respected: animations only exist inside a `prefers-reduced-motion: no-preference` rule.

## Folder contents

- `skin.json`, `tokens.json`, `skin.css`: the skin itself.
- `fonts/`: Press Start 2P and JetBrains Mono (SIL OFL 1.1 licence, see `LICENSES/`).
- `images/grille.svg`: the background grid (CC0).
- `previews/`: real screenshots (home and blog, 1280 px and 390 px).

Skin licence: MIT (see `LICENSE`).
