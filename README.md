# 🎬 Ciné Duel

> Deux actrices, une seule place sous les projecteurs.

**Ciné Duel** est une petite application React où l'on départage, duel après duel, les actrices les plus populaires du moment. Elle utilise les données de [TMDB](https://www.themoviedb.org/).

Projet réalisé dans le cadre de ma formation à l'EPSI.

🔗 **Démo :** https://salagreg.github.io/react-epsi/

## Fonctionnalités

- **Duel « Ton actrice préférée ? »** : deux actrices s'affrontent. La gagnante reste en place et la perdante est remplacée par une actrice jamais vue pendant la partie.
  - Les cartes sont animées à l'entrée et à la sortie.
  - Un compteur affiche les victoires d'affilée de la gagnante.
  - Le duel se joue au clavier avec les flèches **←** et **→**.
  - Un écran final présente la championne, avec un bouton **Rejouer** qui remélange les actrices.
- **Liste** : une grille de toutes les actrices populaires, avec une recherche en direct (debounce et annulation des requêtes obsolètes).
- **Favoris** : un cœur sur chaque carte. Les favoris sont gérés par un Context React et sauvegardés dans le `localStorage`.
- **Responsive** : sur mobile, les deux cartes du duel s'empilent.
- **Robuste** : chaque page a un état de chargement et un état d'erreur (avec un bouton « Réessayer »). Si une image ne charge pas, la carte affiche les initiales de l'actrice.
- **Accessible** : boutons natifs, focus visible, textes alternatifs, et `prefers-reduced-motion` respecté.

## Captures d'écran

<!-- Ajoute tes captures dans docs/screenshots/ puis décommente les lignes ci-dessous. -->
<!--
| Accueil | Duel | Liste |
| --- | --- | --- |
| ![Accueil](docs/screenshots/accueil.png) | ![Duel](docs/screenshots/duel.png) | ![Liste](docs/screenshots/liste.png) |
-->

_Captures à venir._

## Stack technique

- [Vite](https://vite.dev/) et [React 19](https://react.dev/)
- [React Router](https://reactrouter.com/) (`HashRouter`, pour fonctionner sur GitHub Pages)
- CSS Modules : aucune librairie UI, une feuille globale pour les variables (couleurs, typos)
- Polices Google Fonts : _Bebas Neue_ pour les titres, _Inter_ pour le texte
- API [TMDB v3](https://developer.themoviedb.org/docs)

## Installation

Prérequis : **Node.js 20.19+** (ou 22.12+).

```bash
git clone https://github.com/salagreg/react-epsi.git
cd react-epsi
npm install
cp .env.example .env   # puis colle ton token TMDB dans .env
npm run dev
```

L'application est ensuite disponible sur http://localhost:5173.

| Commande          | Rôle                                  |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Serveur de développement              |
| `npm run build`   | Build de production dans `dist/`      |
| `npm run preview` | Prévisualise le build de production   |
| `npm run lint`    | Analyse du code avec oxlint           |

## Obtenir un token TMDB

1. Crée un compte gratuit sur [themoviedb.org](https://www.themoviedb.org/signup).
2. Va dans **Paramètres → API** ([lien direct](https://www.themoviedb.org/settings/api)) et demande une clé API (usage personnel ou éducatif).
3. Copie la valeur **« Jeton d'accès en lecture à l'API »** (_API Read Access Token_). C'est une longue chaîne qui commence par `eyJ…`, à ne pas confondre avec la « Clé d'API » courte.
4. Colle-la dans ton fichier `.env` :

   ```env
   VITE_TMDB_TOKEN=eyJhbGciOi...
   ```

Le fichier `.env` est ignoré par Git : ton token ne sera jamais commité.

## Déploiement sur GitHub Pages

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construit et publie le site à chaque push sur `main`.

1. Dans le dépôt GitHub, va dans **Settings → Secrets and variables → Actions** et ajoute un secret `VITE_TMDB_TOKEN`.
2. Dans **Settings → Pages**, choisis **Source : GitHub Actions**.
3. Pousse sur `main` : le site est publié sur `https://<ton-pseudo>.github.io/react-epsi/`.

> ⚠️ L'application n'a pas de backend : le token est intégré au JavaScript publié et reste donc visible par les visiteurs. Le jeton TMDB est en lecture seule, mais pour un vrai produit il faudrait passer par un petit proxy côté serveur.

## Structure du projet

```
src/
├── api/tmdb.js          # Tous les appels à TMDB (seul fichier qui utilise fetch)
├── components/          # Composants réutilisables (cartes, navbar, états…)
├── context/             # Context des favoris et son provider
├── hooks/               # useDuel, useActressPool, useActressSearch, useFavorites…
├── pages/               # Accueil, Duel, Liste, Favoris, 404
├── styles/global.css    # Variables, reset, utilitaires
└── utils/               # Filtre et formatage des actrices, mélange, pluriels
```

## Crédits

Données et images fournies par [The Movie Database (TMDB)](https://www.themoviedb.org/).

**This product uses the TMDB API but is not endorsed or certified by TMDB.**
