# 🎬 Ciné Duel

**Site :** https://salagreg.github.io/react-epsi/ · Application React (Vite + React Router) branchée sur l'API TMDB. Lancement local : `npm install`, copier `.env.example` en `.env` avec un token TMDB, puis `npm run dev`.

**Ce qui marche :** routes Accueil, Duel, Liste `/actrices`, fiche `/actrices/:id` (chargement / erreur / données, erreur 404 sur `/actrices/99999999`), formulaire `/actrices/new` (champs contrôlés, POST, redirection avec `useNavigate`), Favoris (Context + `localStorage` + `useEffect`, total et bouton « Vider ») et page 404. Les appels réseau sont tous dans `services/`.

**Ce qui ne marche pas :** le POST part vers JSONPlaceholder, car TMDB refuse l'écriture avec un token en lecture seule. La proposition reçoit un id mais n'est pas enregistrée. Le token est visible dans le JavaScript publié, faute de backend.

**Ce que l'IA a écrit :** Claude (Anthropic) m'a aidé à écrire le code et le CSS à partir de mes choix (thème, pages, fonctionnalités).

Détails (installation, token TMDB, déploiement) : [docs/DETAILS.md](docs/DETAILS.md).

This product uses the TMDB API but is not endorsed or certified by TMDB.
