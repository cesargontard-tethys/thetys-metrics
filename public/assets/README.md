# Assets

Dossier servi statiquement par Next.js. Tout fichier ici est accessible via `/<chemin>` (ex: `public/assets/sapio.jpg` → `https://<host>/assets/sapio.jpg`).

## Icônes des apps

- `sapio.jpg` : icône de l'app **Sapio** (placeholder 1.6 ko, à remplacer)
- `vestige.svg` : icône de l'app **Vestige** (placeholder, à remplacer)

Pour changer une icône : déposer le fichier ici sous le même nom, ou éditer le champ `icon` dans `app/apps/<app>/index.js` (ex : `icon: "/assets/sapio.png"`).

## Ajouter une nouvelle app

1. Déposer son icône ici (PNG/JPG/SVG, idéalement carrée).
2. Créer `app/apps/<nom>/` (voir `app/apps/sapio/` comme exemple).
3. L'enregistrer dans `app/apps/index.js`.
