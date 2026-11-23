import ActressGrid from '../../components/ActressGrid/ActressGrid'
import EmptyState from '../../components/StatusMessage/EmptyState'
import ErrorMessage from '../../components/StatusMessage/ErrorMessage'
import Loader from '../../components/StatusMessage/Loader'

/** Affiche la grille, ou l'état de chargement / d'erreur / vide correspondant. */
export default function ActressResults({
  status,
  actresses,
  error,
  onRetry,
  loadingLabel,
  emptyText,
}) {
  if (status === 'loading') return <Loader label={loadingLabel} />
  if (status === 'error') return <ErrorMessage message={error} onRetry={onRetry} />
  if (actresses.length === 0) {
    return (
      <EmptyState title="Aucune actrice">
        <p>{emptyText}</p>
      </EmptyState>
    )
  }
  return <ActressGrid actresses={actresses} />
}
