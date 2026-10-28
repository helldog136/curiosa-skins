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
