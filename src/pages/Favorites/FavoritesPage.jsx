import { Link } from 'react-router'
import ActressGrid from '../../components/ActressGrid/ActressGrid'
import EmptyState from '../../components/StatusMessage/EmptyState'
import { useFavorites } from '../../hooks/useFavorites'
import { pluralize } from '../../utils/format'
import styles from './Favorites.module.css'

// Les favoris sont lus depuis le localStorage (synchrone) : pas d'état de chargement ici.
export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <section className="container page">
        <EmptyState title="Aucune favorite pour l'instant">
          <p>Clique sur le cœur d’une affiche pour l’ajouter ici.</p>
          <Link to="/actrices" className="btn btn-primary">
            Parcourir les actrices
          </Link>
        </EmptyState>
      </section>
    )
  }

  return (
    <section className="container page">
      <header className={`page-header ${styles.header}`}>
        <div>
          <h1 className="page-title">Mes favorites</h1>
          <p className="page-subtitle">Ta sélection, sauvegardée sur cet appareil.</p>
        </div>
        <div className={styles.summary}>
          <p className={styles.total}>Total : {pluralize(favorites.length, 'actrice')}</p>
          <button type="button" className="btn btn-ghost" onClick={clearFavorites}>
            Vider
          </button>
        </div>
      </header>

      <ActressGrid actresses={favorites} />
    </section>
  )
}
