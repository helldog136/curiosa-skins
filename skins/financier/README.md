# Financier

Un tableau de marché : une grille de graphique, un bandeau de cotations peint en haut et en bas de page, des bougies japonaises au pied de l'en-tête, des chiffres à chasse fixe et une pièce dorée pour la marque.

**Pour qui ?** Pour un site sur la bourse, les cryptomonnaies, l'économie, les jeux de gestion, les statistiques ou les tableaux de bord, qui aime une ambiance de salle de marché. Le skin ne donne aucun conseil : il ne fait que changer l'apparence.

## Ce que ce skin change

- Les couleurs : en mode sombre (par défaut), un bleu nuit presque noir, des filets bleu acier et un accent or ; en mode clair, les pages finance d'un journal, avec un fond saumon, des panneaux crème, de l'encre noire et un accent bronze. Les deux modes sont dessinés, pas inversés.
- Les lettres : des titres à empattements, un texte sans empattements pour lire, et une chasse fixe en majuscules pour le menu, les boutons, les étiquettes et les chiffres (chiffres tabulaires : les colonnes restent alignées). Tout vient des polices du système.
- La mise en page : un bandeau de cotations dessiné (symbole, chiffres, flèche), la marque avec une petite pièce, le menu, puis un graphique en bougies sur toute la largeur ; la page est un panneau quadrillé surmonté d'une barre à trois témoins ; au pied, un second bandeau sur fond nuit.
- Les détails : des cartes à trait d'accent, des boutons en touches de terminal, des titres soulignés d'une courbe qui monte, une règle graduée en guise de séparateur, une courbe de cours en filigrane sur les côtés des grands écrans.
- Hausse et baisse : le vert et le rouge ne portent jamais seuls un sens. Les flèches sont des triangles de formes différentes (haut, bas) et un losange pour « sans changement ». Le texte du site dit toujours le reste.
- Le mouvement : aucun. Le décor est entièrement peint et ne bouge pas.

## Ce que ce skin ne change pas

Aucun texte, aucun lien, aucun bouton n'est ajouté, retiré ou déplacé dans le code : seul l'aspect change. Le nom « Curiosa » du pied de page garde toujours son rendu de marque. Vous pouvez changer de skin quand vous voulez, sans rien perdre.

## Clair et sombre

Le skin suit le mode de l'appareil, et le public peut choisir « Clair », « Sombre » ou « Automatique » avec la petite bascule de l'en-tête. Les deux modes respectent le contraste AA.

## Polices et images

Aucune police n'est embarquée : le skin utilise celles du système, rien n'est chargé depuis un autre site. Les images (bandeau de cotations, bougies, courbe, pièce, règle graduée, trait de courbe) sont des dessins écrits par programme pour ce skin (graine fixe, marche aléatoire, formes géométriques simples), sans élément tiers : domaine public (CC0). Ce sont des masques vectoriels que le skin colore avec les couleurs de chaque mode. Licences : dossier `LICENSES/`. Aucune marque, aucun logo, aucune bourse, aucune monnaie, aucune œuvre existante.

## Côté technique

Skin au format du contrat 4 de Curiosa (`skin.json`, `tokens.json`, `skin.css`). Contrôle : `npm run skin:check -- skins/financier --visual --strict` depuis le cœur de Curiosa. Licence du skin : CC0-1.0 (fichier `LICENSE`).

## Personnalisation (1.0.0, Curiosa 0.44.0 ou plus)

Ce skin déclare ce que la personne propriétaire peut changer (Apparence > Personnaliser) : trois ambiances prêtes à l'emploi (Haussier, Baissier, Néon crypto), deux réglages en accès direct (la couleur d'accent et la couleur de la hausse) et, dans « Couleurs du marché », la couleur de la baisse, du fond de la page, des panneaux, de la grille et des liens. Chaque couleur existe en clair et en sombre. Sans rien toucher, le rendu est celui de l'ambiance Haussier. Si une couleur choisie rend un texte difficile à lire, la page de personnalisation le signale à côté du réglage.

---

# Financier (English: "Trading desk")

A market board: a chart grid, a painted ticker band at the top and bottom of the page, candlesticks at the foot of the header, fixed-width figures and a golden coin for the brand.

**Who is it for?** A site about stocks, cryptocurrencies, the economy, management games, statistics or dashboards, that likes a trading-room mood. The skin gives no advice of any kind: it only changes the look.

## What it changes

- Colours: in dark mode (the default), a near-black midnight blue, steel-blue rules and a gold accent; in light mode, the finance pages of a newspaper, with a salmon background, cream panels, black ink and a bronze accent. Both modes are designed, not inverted.
- Lettering: serif headings, a sans-serif text for reading, and fixed-width capitals for the menu, buttons, labels and figures (tabular figures: columns stay aligned). Everything comes from the system fonts.
- Layout: a drawn ticker band (symbol, figures, arrow), the brand with a small coin, the menu, then a candlestick chart across the full width; the page is a gridded panel topped by a three-light status bar; at the foot, a second band on a night background.
- Details: cards with an accent edge, buttons like terminal keys, headings underlined by a rising line, a graduated ruler as the separator, a faint price curve on the sides of wide screens.
- Rise and fall: green and red never carry a meaning alone. The arrows are triangles of different shapes (up, down) and a diamond for "no change". The site's own text always says the rest.
- Motion: none. The decoration is fully painted and never moves.

## What it does not change

No text, link or button is added, removed or moved in the code: only the look changes. The "Curiosa" name in the footer always keeps its brand rendering. You can switch skins at any time without losing anything.

## Light and dark

The skin follows the device mode, and visitors can pick "Light", "Dark" or "Auto" with the small switch in the header. Both modes meet AA contrast.

## Fonts and images

No font is embedded: the skin uses the system fonts, nothing is loaded from another site. The images (ticker band, candlesticks, curve, coin, graduated ruler, curve stroke) are drawings written by program for this skin (fixed seed, random walk, simple geometric shapes), with no third-party element: public domain (CC0). They are vector masks that the skin colours with the colours of each mode. Licences: `LICENSES/` folder. No brand, no logo, no existing exchange, currency or work.

## Technical side

A skin in contract 4 format (`skin.json`, `tokens.json`, `skin.css`). Check: `npm run skin:check -- skins/financier --visual --strict` from a Curiosa core checkout. Skin license: CC0-1.0 (`LICENSE` file).

## Customization (1.0.0, Curiosa 0.44.0 or later)

This skin declares what the owner can change (Appearance > Customize): three ready-made looks (Bull, Bear, Crypto neon), two settings within direct reach (the accent colour and the rise colour) and, under "Market colours", the colour of the fall, the page background, the panels, the grid and the links. Every colour exists in light and dark. Untouched, the rendering is that of the Bull look. If a chosen colour makes a text hard to read, the customization page says so next to the setting.
