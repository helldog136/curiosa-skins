# curiosa-skins

Catalogue officiel des skins de [Curiosa](https://github.com/helldog136/Curiosa) (cœur 0.4.0 ou plus).
*Official catalogue of [Curiosa](https://github.com/helldog136/Curiosa) skins (core 0.4.0 or later).*

## Les skins / The skins

| Skin | Version | Modes | Dossier / Folder |
|---|---|---|---|
| Brutaliste clair / Light brutalist | 1.0.0 | clair / light | `skins/brutaliste-clair` |
| Éditorial papier / Editorial paper | 1.0.1 | clair, sombre / light, dark | `skins/editorial-papier` |
| Rétro néon / Retro neon | 1.0.0 | sombre / dark | `skins/retro-neon` |
| Steampunk victorien / Victorian steampunk | 1.0.1 | sombre, clair / dark, light | `skins/steampunk-victorien` |
| Verre et dégradés doux / Soft glass | 1.0.1 | clair, sombre / light, dark | `skins/verre-doux` |

Chaque skin est un dossier de données (`skin.json`, `tokens.json`, `skin.css`, polices et images avec leurs licences) : aucun programme ne s'exécute, seule l'apparence change.
*Each skin is a folder of data: no code runs, only the appearance changes.*

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

Chaque skin porte sa licence (MIT) et celles de ses polices et images dans son dossier. / *Each skin carries its own license (MIT) and those of its fonts and images in its folder.*
