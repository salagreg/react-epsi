import styles from './Home.module.css'

/** Alerte affichée sur l'accueil quand l'app a été construite sans token TMDB. */
export default function MissingTokenNotice() {
  return (
    <div className={styles.notice} role="alert">
      <h2 className={styles.noticeTitle}>Token TMDB manquant</h2>
      <p>
        L’application ne peut pas charger les actrices : la variable <code>VITE_TMDB_TOKEN</code>{' '}
        n’est pas définie.
      </p>
      <ul>
        <li>
          <strong>En local :</strong> copie <code>.env.example</code> en <code>.env</code>, colle
          ton token TMDB, puis relance <code>npm run dev</code>.
        </li>
        <li>
          <strong>Sur GitHub Pages :</strong> ajoute le secret <code>VITE_TMDB_TOKEN</code> dans
          les paramètres du dépôt, puis relance le workflow de déploiement.
        </li>
      </ul>
    </div>
  )
}
