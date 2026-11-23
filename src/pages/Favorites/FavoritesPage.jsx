import { Link } from 'react-router'
import ActressGrid from '../../components/ActressGrid/ActressGrid'
import EmptyState from '../../components/StatusMessage/EmptyState'
import { useFavorites } from '../../hooks/useFavorites'
import { pluralize } from '../../utils/format'

// Les favoris sont lus depuis le localStorage (synchrone) : pas d'état de chargement ici.
export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section className="container page">
      <header className="page-header">
        <h1 className="page-title">Mes favorites</h1>
        <p className="page-subtitle">
          {favorites.length > 0
            ? `${pluralize(favorites.length, 'actrice')} dans ta sélection`
            : 'Ta sélection personnelle, sauvegardée sur cet appareil.'}
        </p>
      </header>

      {favorites.length > 0 ? (
        <ActressGrid actresses={favorites} />
      ) : (
        <EmptyState title="Aucune favorite pour l'instant">
          <p>Clique sur le cœur d’une affiche pour l’ajouter ici.</p>
          <Link to="/actrices" className="btn btn-primary">
            Parcourir les actrices
          </Link>
        </EmptyState>
      )}
    </section>
  )
}
