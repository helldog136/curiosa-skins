# Curiosa

L'habillage officiel de Curiosa : un cabinet de curiosités chaleureux. *Votre site, votre collection.*

**Pour qui ?** Pour un site personnel qui montre ce qu'on aime et ce qu'on collectionne : blog, portfolio, page de créateur ou de créatrice, carnet de notes. Les modules s'y rangent comme des tiroirs.

## Ce que ce skin change

- Les couleurs : un fond crème, un texte en nuit d'encre, du laiton, de la terre cuite et de la sauge. Le mode sombre prend la nuit d'encre en fond et le crème en texte, avec un laiton clair pour les liens.
- Les formes : des briques arrondies. Les titres de section portent une petite brique de couleur, le titre de page est souligné de trois briques, les listes à puces ont des briques en guise de puces.
- Les cartes : des « tiroirs » papier avec une poignée fine de laiton en bas.
- Les pastilles (catégories, étiquettes) : fond teinté, texte toujours en nuit d'encre.
- La mise en page de l'en-tête (classique, deux rangées, centrée ou sobre) reste celle que vous choisissez dans Apparence.

## Polices

Elles sont dans le skin : rien n'est chargé depuis un autre site, et aucune visite ne contacte un tiers.

- Fraunces (titres) : une serif douce et expressive, en romain et en italique.
- Instrument Sans (texte et interface).
- JetBrains Mono (petites étiquettes, code).

Seul le sous-ensemble latin est embarqué (environ 134 Ko pour les quatre fichiers). Le texte garde une police de repli lisible (Georgia / police du système) pour les caractères hors de ce sous-ensemble.

## Lisibilité

Texte courant en nuit d'encre sur crème (14,6 pour 1) et en crème sur nuit d'encre (14,6 pour 1). Le laiton, la terre cuite et la sauge ne portent jamais de texte courant sur le crème : ce sont des fonds, des traits et des pastilles. Les liens utilisent une terre cuite foncée en mode clair et un laiton clair en mode sombre (au moins 4,5 pour 1 dans les deux). L'anneau de focus fait 3 px.

## Ce que ce skin ne change pas

Aucun texte, aucun lien, aucun bouton n'est ajouté, retiré ou déplacé : seul l'aspect change. Vous pouvez changer de skin quand vous voulez, sans rien perdre. Le nom « Curiosa » du pied de page garde toujours son rendu de marque.

## Licences

Polices : SIL Open Font License 1.1 (textes dans `LICENSES/`). Motif de briques : domaine public (CC0). Skin : MIT (fichier `LICENSE`).

## Côté technique

Skin au format du contrat 1 de Curiosa (`skin.json`, `tokens.json`, `skin.css`). Contrôle : `npm run skin:check -- skins/curiosa --visual --strict` depuis le cœur de Curiosa.
