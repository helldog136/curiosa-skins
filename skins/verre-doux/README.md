# Verre et dégradés doux

Un look d'application moderne : du verre dépoli, des couleurs pastel qui se fondent, des formes toutes rondes.

**Pour qui ?** Pour un site vivant et accueillant : ateliers, collectifs de création, communautés. Le menu et les cartes semblent flotter.

## Ce que ce skin change

- Les couleurs : des dégradés doux en fond (lavande, rose, bleu clair le jour ; bleu nuit, violet et rose la nuit). Les boutons et le menu actif ont un dégradé violet-rose.
- Les formes : tout est très arrondi. L'en-tête est un « îlot » de verre qui reste en haut de l'écran quand on descend (sur grand écran), le menu est fait de pastilles, les cartes sont des cartes de verre avec une ombre diffuse.
- La police : Outfit, une police géométrique ronde et lisible.
- L'accueil est aéré : de grands espaces entre les blocs.

## Lisibilité

Le texte repose toujours sur un fond opaque. Le verre flou n'est ajouté que par-dessus, quand le navigateur sait le faire, avec une transparence faible : si le navigateur ne sait pas flouter, le fond reste plein et tout se lit pareil. Les contrastes respectent le niveau AA, en clair comme en sombre.

## Clair et sombre : la vitrine

Ce skin a deux modes. Il suit celui de l'appareil, et le public peut choisir « Clair », « Sombre » ou « Automatique » avec la bascule de l'en-tête (son choix reste dans son navigateur, rien n'est envoyé).

## Ce que ce skin ne change pas

Aucun texte, aucun lien, aucun bouton n'est ajouté, retiré ou déplacé : seul l'aspect change. Vous pouvez changer de skin quand vous voulez, sans rien perdre.

## Polices et images

Elles sont dans le skin (rien n'est chargé depuis un autre site). Licences : voir `LICENSES/` (police : SIL Open Font License 1.1 ; motif : domaine public).

## Côté technique

Skin au format du contrat 1 de Curiosa. Contrôle : `npm run skin:check -- skins/verre-doux` depuis le cœur. Licence du skin : MIT (fichier `LICENSE`). Les fichiers `README.md` et `LICENSE` sont permis à la racine du dossier du skin.
