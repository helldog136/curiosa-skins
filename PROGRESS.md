# PROGRESS (état du travail, à supprimer avant la fusion dans main)

## Fait
- `npm run skin:check -- skins/<id> --visual --strict --core-version 0.4.0` sans erreur ni avertissement (cœur feat/skins-int2 09710c8).
- Boîtes intérieures des modules restylées par `module-html` ; texte des cartes aligné par `card-body` ; panneau d'appel à l'action lisible ; cibles 44 px.
- Installation réelle par le service du cœur, preuve de contenu identique (seul écart : ligne « Clair ou sombre » de /privacy ajoutée par le cœur), menu mobile et bascule de mode vérifiés, captures 12 pages x 4 largeurs x 2 modes, aperçus 1280x800 et 390x844.

## Reste
- Rien d'obligatoire. Supprimer ce fichier avant la fusion dans main.

## Commandes (outils dans /tmp/claude-0/-home-user/4e3492ee-8e17-57de-8380-ae93be24b42a/scratchpad/sk-tools/)
- Cœur : /dev/shm/sk-core (branche feat/skins-int, construit) ; instantané : /dev/shm/sk-visual/snapshot (`VISUAL_ROOT=/dev/shm/sk-visual npm run visual:prepare`).
- Serveur de test (cœur « fantôme » 0.4.0, horloge figée, port 3670) : `sk-tools/e2e-up.sh reset` ; arrêt : `sk-tools/e2e-down.sh`.
- Installer + activer : `sk-tools/redeploy.sh <id> <dossier-du-skin>` (dépôt git local + installFromCatalogue).
- Captures : `sk-tools/shot.sh <dossier> 390,768,1280,1920 light,dark accueil,blog,...` (toute commande lourde derrière `flock /dev/shm/heavy.lock`).
- Contrôle : `cd /dev/shm/sk-core && npm run skin:check -- <dossier> --core-version 0.4.0`.
- Preuve de contenu : `node sk-tools/proof.mjs <id> <headerLayout par défaut du skin>`.

## Pièges / défauts connus
- Le harnais `visual:capture` profil skin-test ne marche plus avec le registre de S5 (pas d'empreinte) : utiliser redeploy.sh.
- Le cœur 0.3.1 refuse `minCore 0.4.0` : d'où le cœur « fantôme ».
- Les boîtes internes des modules (div/section/article, styles en ligne) ne sont pas atteignables par un skin : leurs arrondis/couleurs propres subsistent.
- Mobile : l'en-tête est haut (11 réseaux sur 2 lignes, cibles 44 px).
